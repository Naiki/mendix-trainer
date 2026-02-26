// ============ AUDIO (Web Audio API for timer beeps) ============
let audioCtx = null;

export function playBeep(frequency, duration) {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        // Audio nicht verfuegbar -- stille Fortsetzung
    }
}

export function playWarningBeep() {
    playBeep(880, 0.3);
}

export function playCriticalBeep() {
    playBeep(1200, 0.15);
    setTimeout(() => playBeep(1200, 0.15), 200);
}

export function playCorrectBeep() {
    playBeep(660, 0.15);
    setTimeout(() => playBeep(880, 0.2), 150);
}

export function playWrongBeep() {
    playBeep(330, 0.3);
}
