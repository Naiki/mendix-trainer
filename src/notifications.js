// ============ PWA & NOTIFICATIONS ============
import { getNotificationSettings, saveNotificationSettings } from './persistence.js';

let reminderInterval = null;

export async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const reg = await navigator.serviceWorker.register('./sw.js');
            console.log('Service Worker registriert');
            return reg;
        } catch (err) {
            console.warn('Service Worker Registrierung fehlgeschlagen:', err);
        }
    }
    return null;
}

async function requestNotificationPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
}

export async function toggleNotifications(renderCallback) {
    const settings = getNotificationSettings();

    if (!settings.enabled) {
        const granted = await requestNotificationPermission();
        if (!granted) {
            alert('Bitte erlaube Benachrichtigungen in den Einstellungen deines Browsers/Geräts.');
            return;
        }
        settings.enabled = true;
        saveNotificationSettings(settings);
        scheduleNextReminder();
    } else {
        settings.enabled = false;
        saveNotificationSettings(settings);
        cancelReminder();
    }
    if (renderCallback) renderCallback();
}

export function updateReminderTime(timeStr) {
    const [hour, minute] = timeStr.split(':').map(Number);
    const settings = getNotificationSettings();
    settings.hour = hour;
    settings.minute = minute;
    saveNotificationSettings(settings);
    if (settings.enabled) {
        scheduleNextReminder();
    }
}

export function scheduleNextReminder() {
    cancelReminder();
    const settings = getNotificationSettings();
    if (!settings.enabled) return;
    checkAndShowReminder();
    reminderInterval = setInterval(checkAndShowReminder, 60000);
}

function checkAndShowReminder() {
    const settings = getNotificationSettings();
    if (!settings.enabled) return;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const targetMinutes = settings.hour * 60 + settings.minute;
    const today = now.toISOString().slice(0, 10);

    if (Math.abs(currentMinutes - targetMinutes) <= 1 && settings.lastShown !== today) {
        settings.lastShown = today;
        saveNotificationSettings(settings);
        showReminder();
    }
}

function cancelReminder() {
    if (reminderInterval) {
        clearInterval(reminderInterval);
        reminderInterval = null;
    }
}

function showReminder() {
    const messages = [
        'Zeit für Mendix! 5 Fragen am Tag machen den Unterschied.',
        'Deine Mendix-Zertifizierung wartet! Kurze Übungsrunde?',
        'Bleib dran! Jeden Tag ein bisschen lernen bringt dich ans Ziel.',
        'Mendix Trainer: Dein tägliches Training steht an!',
        'Nur 5 Minuten! Halte deine Streak aufrecht.',
    ];
    const body = messages[Math.floor(Math.random() * messages.length)];

    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'SHOW_NOTIFICATION',
            title: 'Mendix Trainer',
            body: body,
        });
    } else if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Mendix Trainer', {
            body: body,
            icon: './icon-192.svg',
            tag: 'mendix-daily-reminder',
        });
    }
}

export function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}
