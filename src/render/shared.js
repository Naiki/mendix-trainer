// ============ SHARED RENDER HELPERS ============
import { APP_VERSION } from '../constants.js';
import { escapeHtml } from '../utils.js';
import { getTotalQuestionCount, examColor } from '../questions.js';

export function renderError(error) {
    return `
    <div class="fade-in text-center py-16">
        <div class="text-5xl mb-4">\u26A0\uFE0F</div>
        <h2 class="text-2xl font-bold text-mendix-red mb-2">Etwas ist schiefgelaufen</h2>
        <p class="text-gray-400 mb-6 max-w-md mx-auto">
            Ein unerwarteter Fehler ist aufgetreten. Dein Fortschritt ist gespeichert.
        </p>
        <pre class="text-xs text-gray-500 bg-gray-900 rounded-lg p-4 mb-6 max-w-lg mx-auto text-left overflow-x-auto">${escapeHtml(error.message || 'Unbekannter Fehler')}</pre>
        <div class="space-x-3">
            <button data-action="navigate" data-screen="home" class="bg-mendix-blue hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition">
                Zur Startseite
            </button>
            <button data-action="reload" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition">
                Seite neu laden
            </button>
        </div>
    </div>`;
}

export function renderFooter() {
    const counts = getTotalQuestionCount();
    return `
    <div class="app-footer text-center text-xs text-gray-500 pb-4 mt-8">
        <span>Mendix Trainer v${APP_VERSION}</span>
        <span class="mx-2">\u00B7</span>
        <span>${counts.total} Fragen (${counts.intermediate} Intermediate, ${counts.advanced} Advanced)</span>
    </div>`;
}

export function renderExamCard(exam, title, progress, topics, prereq) {
    const pct = progress.total > 0 ? Math.round((progress.mastered / progress.total) * 100) : 0;
    const color = examColor(exam);

    return `
    <div class="bg-gray-900 rounded-xl p-6 border border-gray-800 card-hover cursor-pointer"
         data-action="navigate" data-screen="categories" data-exam="${escapeHtml(exam)}" role="button" tabindex="0">
        <div class="flex justify-between items-start mb-3">
            <div>
                <h2 class="text-xl font-bold text-${color}">${escapeHtml(title)}</h2>
                <p class="text-xs text-gray-400 mt-1">${escapeHtml(prereq)}</p>
            </div>
            <div class="text-right">
                <div class="text-2xl font-bold">${pct}%</div>
                <div class="text-xs text-gray-400">gemeistert</div>
            </div>
        </div>
        <div class="w-full bg-gray-800 rounded-full h-2 mb-3" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
            <div class="bg-${color} h-2 rounded-full progress-fill" style="width: ${pct}%"></div>
        </div>
        <p class="text-xs text-gray-400">${escapeHtml(topics)}</p>
        <div class="flex justify-between items-center mt-3 text-xs text-gray-400">
            <span>${progress.answered}/${progress.total} bearbeitet</span>
            <span class="text-${color} font-medium">Starten \u2192</span>
        </div>
    </div>`;
}
