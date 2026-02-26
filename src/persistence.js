// ============ PERSISTENCE (with in-memory cache) ============
import { MASTERY_STREAK } from './constants.js';

const STORAGE_KEY = 'mendix-trainer-progress';
const STREAK_STORAGE_KEY = 'mendix-trainer-streak';
const NOTIFICATION_STORAGE_KEY = 'mendix-trainer-notifications';

let _progressCache = null;

export function loadProgress() {
    if (_progressCache) return _progressCache;
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        _progressCache = data ? JSON.parse(data) : {};
        return _progressCache;
    } catch { _progressCache = {}; return _progressCache; }
}

export function saveProgress(progress) {
    _progressCache = progress;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
        console.warn('LocalStorage voll, Fortschritt konnte nicht gespeichert werden');
    }
}

export function clearProgressCache() {
    _progressCache = null;
}

// ============ DAILY STREAK ============
export function getStreakData() {
    try {
        const data = localStorage.getItem(STREAK_STORAGE_KEY);
        return data ? JSON.parse(data) : { current: 0, lastDate: null };
    } catch { return { current: 0, lastDate: null }; }
}

export function updateStreak() {
    const streak = getStreakData();
    const today = new Date().toISOString().slice(0, 10);
    if (streak.lastDate === today) return streak;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (streak.lastDate === yesterday) {
        streak.current++;
    } else if (streak.lastDate !== today) {
        streak.current = 1;
    }
    streak.lastDate = today;
    try { localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(streak)); } catch {}
    return streak;
}

export function getQuestionProgress(questionId) {
    const progress = loadProgress();
    return progress[questionId] || { attempts: 0, correct: 0, lastSeen: 0, streak: 0 };
}

export function recordAnswer(questionId, isCorrect) {
    const progress = loadProgress();
    const q = progress[questionId] || { attempts: 0, correct: 0, lastSeen: 0, streak: 0 };
    q.attempts++;
    if (isCorrect) {
        q.correct++;
        q.streak++;
    } else {
        q.streak = 0;
    }
    q.lastSeen = Date.now();
    progress[questionId] = q;
    saveProgress(progress);
}

// ============ NOTIFICATION SETTINGS ============
export function getNotificationSettings() {
    try {
        const data = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
        return data ? JSON.parse(data) : { enabled: false, hour: 19, minute: 0 };
    } catch { return { enabled: false, hour: 19, minute: 0 }; }
}

export function saveNotificationSettings(settings) {
    try {
        localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(settings));
    } catch {}
}

export function resetAllProgress() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STREAK_STORAGE_KEY);
    _progressCache = null;
}
