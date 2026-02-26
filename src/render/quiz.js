// ============ QUIZ SCREEN ============
import { PASS_THRESHOLD, TIMER_WARN_5MIN, TIMER_WARN_1MIN } from '../constants.js';
import { state } from '../state.js';
import { escapeHtml } from '../utils.js';
import { examColor } from '../questions.js';
import { formatTime } from '../timer.js';

export function renderQuiz() {
    const q = state.questions[state.questionIndex];
    if (!q) return '';

    if (!q._shuffled) {
        const indices = q.options.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        q._shuffledOptions = indices.map(i => q.options[i]);
        q._shuffledCorrect = indices.indexOf(q.correct);
        q._shuffleMap = indices;
        q._shuffled = true;
    }

    const total = state.questions.length;
    const current = state.questionIndex + 1;
    const pct = Math.round((current / total) * 100);
    const color = examColor(state.exam);
    const letters = ['A', 'B', 'C', 'D'];
    const isExamMode = state.category === 'exam';
    const displayOptions = q._shuffledOptions;
    const displayCorrect = q._shuffledCorrect;

    let timerClasses = 'text-sm font-mono font-bold';
    if (state.timerSeconds <= TIMER_WARN_1MIN) {
        timerClasses += ' text-mendix-red timer-critical';
    } else if (state.timerSeconds <= TIMER_WARN_5MIN) {
        timerClasses += ' text-mendix-orange timer-warning';
    } else {
        timerClasses += ' text-mendix-orange';
    }

    return `
    <div class="fade-in">
        <div class="flex items-center justify-between mb-4">
            <button data-action="confirmQuitQuiz" class="text-gray-400 hover:text-white transition text-sm py-2 px-1">
                \u2190 Abbrechen
            </button>
            ${isExamMode ? `<span id="exam-timer" class="${timerClasses}">${formatTime(state.timerSeconds)}</span>` : ''}
            <span class="text-sm text-gray-400">${current} / ${total}</span>
            <span class="text-sm font-medium ${state.sessionTotal > 0 ? (state.sessionCorrect / state.sessionTotal >= PASS_THRESHOLD / 100 ? 'text-mendix-green' : 'text-mendix-red') : 'text-gray-400'}">
                ${state.sessionCorrect}/${state.sessionTotal}
            </span>
        </div>

        <div class="w-full bg-gray-800 rounded-full h-1 mb-6" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Fortschritt">
            <div class="bg-${color} h-1 rounded-full progress-fill" style="width: ${pct}%"></div>
        </div>

        <span class="badge-${escapeHtml(q.category)} text-xs px-2 py-0.5 rounded-full text-white font-medium">${escapeHtml(q.categoryLabel)}</span>

        <h3 class="text-lg font-medium mt-3 mb-6 leading-relaxed">${escapeHtml(q.question)}</h3>

        <div class="space-y-3">
            ${displayOptions.map((opt, i) => {
                let classes = 'option-btn';
                if (state.answered) {
                    classes += ' answered';
                    if (i === displayCorrect) classes += ' correct';
                    else if (i === state.selectedAnswer && i !== displayCorrect) classes += ' incorrect';
                }
                return `
                <button class="${classes} w-full text-left p-4 rounded-xl flex items-start gap-3"
                        data-action="answerQuestion" data-index="${i}" ${state.answered ? 'disabled' : ''}
                        aria-label="Antwort ${letters[i]}: ${escapeHtml(opt)}">
                    <span class="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold
                        ${state.answered && i === displayCorrect ? 'bg-mendix-green text-white' :
                          state.answered && i === state.selectedAnswer && i !== displayCorrect ? 'bg-mendix-red text-white' :
                          'bg-gray-800 text-gray-400'}">${letters[i]}</span>
                    <span class="pt-0.5">${escapeHtml(opt)}</span>
                </button>`;
            }).join('')}
        </div>

        ${state.answered ? `
        <div id="explanation-box" class="mt-6 p-4 rounded-xl border ${state.selectedAnswer === displayCorrect ? 'bg-green-950/30 border-green-900' : 'bg-red-950/30 border-red-900'}">
            <div class="flex items-center gap-2 mb-2">
                <span class="text-lg">${state.selectedAnswer === displayCorrect ? '\u2713' : '\u2717'}</span>
                <span class="font-bold ${state.selectedAnswer === displayCorrect ? 'text-mendix-green' : 'text-mendix-red'}">
                    ${state.selectedAnswer === displayCorrect ? 'Richtig!' : 'Falsch!'}
                </span>
            </div>
            <p class="text-sm text-gray-300 leading-relaxed">${escapeHtml(q.explanation)}</p>
        </div>
        <button data-action="nextQuestion" class="w-full mt-4 bg-${color} hover:opacity-90 text-white font-bold py-3 rounded-xl transition">
            ${state.questionIndex < state.questions.length - 1 ? 'N\u00E4chste Frage \u2192' : 'Ergebnis anzeigen'}
        </button>
        ` : ''}

        <div class="keyboard-hint text-center mt-6 text-gray-400">
            <kbd>1</kbd>\u2013<kbd>4</kbd> zum Antworten${state.answered ? ', <kbd>Enter</kbd> f\u00FCr n\u00E4chste' : ''}
        </div>
    </div>`;
}
