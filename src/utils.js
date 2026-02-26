// ============ UTILITIES ============

const _escapeEl = typeof document !== 'undefined' ? document.createElement('div') : null;

export function escapeHtml(text) {
    if (text == null) return '';
    if (_escapeEl) {
        _escapeEl.textContent = String(text);
        return _escapeEl.innerHTML;
    }
    // Node.js fallback for tests
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
