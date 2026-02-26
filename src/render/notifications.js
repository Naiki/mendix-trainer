// ============ NOTIFICATION UI ============
import { getNotificationSettings } from '../persistence.js';
import { isPWA } from '../notifications.js';

export function renderNotificationSection() {
    const settings = getNotificationSettings();
    const timeStr = `${String(settings.hour).padStart(2, '0')}:${String(settings.minute).padStart(2, '0')}`;
    const permStatus = 'Notification' in window ? Notification.permission : 'unavailable';

    if (!isPWA() && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        return `
        <div class="notification-banner" data-action="toggleInstallDetails">
            <div class="flex items-center gap-3">
                <span class="text-2xl">\uD83D\uDCF2</span>
                <div>
                    <div class="font-bold text-white text-sm">Zum Home-Bildschirm hinzuf\u00FCgen</div>
                    <div class="text-xs text-white/70">F\u00FCr Push-Erinnerungen & Offline-Zugang</div>
                </div>
            </div>
            <div class="install-details hidden mt-3 text-xs text-white/80 space-y-1">
                <p>1. Tippe auf <strong>Teilen</strong> (\u25A1\u2191) unten im Safari</p>
                <p>2. Scrolle nach unten und tippe <strong>"Zum Home-Bildschirm"</strong></p>
                <p>3. Tippe <strong>"Hinzuf\u00FCgen"</strong></p>
            </div>
        </div>`;
    }

    if (permStatus === 'unavailable') return '';

    return `
    <div class="notification-settings">
        <div class="flex items-center justify-between mb-3">
            <div>
                <div class="font-bold text-sm">T\u00E4gliche Erinnerung</div>
                <div class="text-xs text-gray-400">Werde jeden Tag ans Lernen erinnert</div>
            </div>
            <div class="toggle-switch ${settings.enabled ? 'active' : ''}" data-action="toggleNotifications" role="switch" aria-checked="${settings.enabled}" tabindex="0"></div>
        </div>
        ${settings.enabled ? `
        <div class="flex items-center gap-3">
            <span class="text-xs text-gray-400">Uhrzeit:</span>
            <input type="time" class="notification-time-picker" value="${timeStr}" data-action="updateReminderTime">
        </div>
        ` : ''}
        ${permStatus === 'denied' ? '<p class="text-xs text-mendix-red mt-2">Benachrichtigungen sind blockiert. Bitte in den Ger\u00E4teeinstellungen aktivieren.</p>' : ''}
    </div>`;
}
