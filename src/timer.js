// ============ TIMER ============
import { TIMER_WARN_5MIN, TIMER_WARN_1MIN } from './constants.js';
import { playWarningBeep, playCriticalBeep } from './audio.js';
import { state } from './state.js';

export function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

export function startTimer(seconds, onExpired) {
    stopTimer();
    state.timerSeconds = seconds;
    state.timerWarned5 = false;
    state.timerWarned1 = false;
    state.timerInterval = setInterval(() => {
        state.timerSeconds--;
        const el = document.getElementById('exam-timer');
        if (el) {
            el.textContent = formatTime(state.timerSeconds);

            if (state.timerSeconds <= TIMER_WARN_5MIN && !state.timerWarned5) {
                state.timerWarned5 = true;
                el.className = 'text-sm font-mono font-bold text-mendix-orange timer-warning';
                playWarningBeep();
                showTimerToast('5 Minuten verbleibend!');
            }

            if (state.timerSeconds <= TIMER_WARN_1MIN && !state.timerWarned1) {
                state.timerWarned1 = true;
                el.className = 'text-sm font-mono font-bold text-mendix-red timer-critical';
                playCriticalBeep();
                showTimerToast('Noch 1 Minute!');
            }
        }
        if (state.timerSeconds <= 0) {
            stopTimer();
            playCriticalBeep();
            if (onExpired) onExpired();
        }
    }, 1000);
}

export function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function showTimerToast(message) {
    const existing = document.getElementById('timer-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'timer-toast';
    toast.setAttribute('role', 'alert');
    toast.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:9999;' +
        'padding:10px 24px;border-radius:12px;font-weight:bold;font-size:14px;color:#fff;' +
        'background:#F04438;box-shadow:0 4px 20px rgba(240,68,56,0.4);transition:opacity 0.5s ease;';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
