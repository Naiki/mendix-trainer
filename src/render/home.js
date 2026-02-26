// ============ HOME SCREEN ============
import { APP_VERSION, EXAM_QUESTION_COUNT, PASS_THRESHOLD } from '../constants.js';
import { state } from '../state.js';
import { loadProgress, getStreakData } from '../persistence.js';
import { getTotalQuestionCount, getExamProgress } from '../questions.js';
import { renderFooter, renderExamCard } from './shared.js';
import { renderNotificationSection } from './notifications.js';

export function renderHome() {
    const intProgress = getExamProgress('intermediate');
    const advProgress = getExamProgress('advanced');
    const progress = loadProgress();
    const totalAnswered = Object.values(progress).filter(p => p.attempts > 0).length;
    const totalCorrect = Object.values(progress).reduce((sum, p) => sum + p.correct, 0);
    const totalAttempts = Object.values(progress).reduce((sum, p) => sum + p.attempts, 0);
    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    return `
    <div class="fade-in">
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2">
                <span class="text-mendix-blue">Mendix</span> Trainer
            </h1>
            <p class="text-gray-400">Intermediate &amp; Advanced Zertifizierung bestehen</p>
        </div>

        ${totalAnswered > 0 ? `
        <button data-action="quickStart" class="w-full bg-mendix-blue hover:opacity-90 text-white font-bold py-4 rounded-xl transition mb-6 text-lg">
            Weiter lernen
        </button>` : ''}

        <div class="grid grid-cols-${totalAnswered > 0 ? '4' : '3'} gap-3 mb-8">
            ${totalAnswered > 0 ? `
            <div class="bg-gray-900 rounded-xl p-3 text-center border border-gray-800">
                <div class="text-2xl font-bold text-mendix-orange">${getStreakData().current}</div>
                <div class="text-xs text-gray-400">Tage-Streak</div>
            </div>` : ''}
            <div class="bg-gray-900 rounded-xl p-3 text-center border border-gray-800">
                <div class="text-2xl font-bold text-mendix-blue">${totalAnswered}</div>
                <div class="text-xs text-gray-400">Bearbeitet</div>
            </div>
            <div class="bg-gray-900 rounded-xl p-3 text-center border border-gray-800">
                <div class="text-2xl font-bold text-mendix-green">${accuracy}%</div>
                <div class="text-xs text-gray-400">Genauigkeit</div>
            </div>
            <div class="bg-gray-900 rounded-xl p-3 text-center border border-gray-800">
                <div class="text-2xl font-bold text-mendix-purple">${intProgress.mastered + advProgress.mastered}</div>
                <div class="text-xs text-gray-400">Gemeistert</div>
            </div>
        </div>

        ${renderNotificationSection()}

        <div class="space-y-4">
            ${renderExamCard('intermediate', 'Intermediate Developer', intProgress,
                'XPath, Microflows, Domain Modeling, Page Building, Security, Integration',
                'Voraussetzung: Rapid Developer \u2713')}
            ${renderExamCard('advanced', 'Advanced Developer', advProgress,
                'Advanced Domain Model, Performance, Security, Error Handling, Testing, Java',
                'Voraussetzung: Intermediate Developer')}
        </div>

        <div class="mt-6">
            <button data-action="toggleAbout" class="w-full text-center text-xs text-gray-400 hover:text-gray-400 transition py-2"
                    aria-expanded="${state.showAbout}" aria-controls="about-section">
                ${state.showAbout ? '\u25B2 Weniger anzeigen' : '\u25BC \u00DCber diese App'}
            </button>
            ${state.showAbout ? renderAbout() : ''}
        </div>

        <div class="mt-4 text-center">
            <button data-action="resetProgress" class="text-xs text-gray-500 hover:text-gray-400 transition">
                Fortschritt zur\u00FCcksetzen
            </button>
        </div>

        ${renderFooter()}
    </div>`;
}

function renderAbout() {
    const counts = getTotalQuestionCount();
    return `
    <div id="about-section" class="about-section rounded-xl p-5 mt-2 fade-in">
        <h3 class="font-bold text-mendix-blue mb-3">\u00DCber Mendix Trainer</h3>
        <div class="space-y-2 text-sm text-gray-400">
            <p><strong class="text-gray-300">Version:</strong> ${APP_VERSION}</p>
            <p><strong class="text-gray-300">Fragen:</strong> ${counts.total} Pr\u00FCfungsfragen (${counts.intermediate} Intermediate, ${counts.advanced} Advanced)</p>
            <p><strong class="text-gray-300">Lernmethode:</strong> Spaced Repetition mit adaptiver Priorisierung. Fragen, die du falsch beantwortest, erscheinen h\u00E4ufiger.</p>
            <p><strong class="text-gray-300">Pr\u00FCfungsmodus:</strong> Simuliert die echte Mendix-Pr\u00FCfung mit Zeitlimit und ${EXAM_QUESTION_COUNT} Fragen. Bestehensgrenze: ${PASS_THRESHOLD}%.</p>
            <p><strong class="text-gray-300">Fortschritt:</strong> Wird lokal im Browser gespeichert. Kein Account n\u00F6tig, keine Daten werden \u00FCbertragen.</p>
            <p><strong class="text-gray-300">Tastatur:</strong> <kbd>1</kbd>\u2013<kbd>4</kbd> oder <kbd>A</kbd>\u2013<kbd>D</kbd> zum Antworten, <kbd>Enter</kbd> f\u00FCr n\u00E4chste Frage.</p>
        </div>
    </div>`;
}
