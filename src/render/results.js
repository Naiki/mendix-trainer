// ============ RESULTS SCREEN ============
import { PASS_THRESHOLD, PRACTICE_COUNT } from '../constants.js';
import { state } from '../state.js';
import { escapeHtml } from '../utils.js';
import { examColor } from '../questions.js';
import { renderFooter } from './shared.js';

export function renderResults() {
    const pct = state.sessionTotal > 0 ? Math.round((state.sessionCorrect / state.sessionTotal) * 100) : 0;
    const passed = pct >= PASS_THRESHOLD;
    const wrong = state.sessionAnswers.filter(a => !a.isCorrect);
    const color = examColor(state.exam);
    const letters = ['A', 'B', 'C', 'D'];
    const categoryBreakdown = buildCategoryBreakdown();

    return `
    <div class="fade-in">
        <div class="text-center mb-8">
            <div class="text-6xl mb-4">${passed ? '\uD83C\uDF89' : '\uD83D\uDCDA'}</div>
            <h2 class="text-3xl font-bold mb-2">${pct}%</h2>
            <p class="text-lg ${passed ? 'text-mendix-green' : 'text-mendix-red'}">
                ${passed ? 'Bestanden!' : 'Noch nicht bestanden'}
            </p>
            <p class="text-sm text-gray-500 mt-1">
                ${state.sessionCorrect} von ${state.sessionTotal} richtig (${PASS_THRESHOLD}% zum Bestehen)
            </p>
        </div>

        <div class="relative w-full bg-gray-800 rounded-full h-4 mb-6">
            <div class="absolute left-[75%] top-0 w-0.5 h-4 bg-white/50 z-10" title="${PASS_THRESHOLD}% Bestehensgrenze"></div>
            <div class="${passed ? 'bg-mendix-green' : 'bg-mendix-red'} h-4 rounded-full progress-fill" style="width: ${pct}%"></div>
        </div>

        <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-4">
            <h3 class="font-bold mb-3 text-gray-300">Ergebnis nach Kategorie</h3>
            <div class="space-y-3">
                ${categoryBreakdown.map(cat => {
                    const catPct = cat.total > 0 ? Math.round((cat.correct / cat.total) * 100) : 0;
                    const catColor = catPct >= 75 ? '#12B76A' : catPct >= 50 ? '#F79009' : '#F04438';
                    return `
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <span class="badge-${escapeHtml(cat.key)} text-xs px-2 py-0.5 rounded-full text-white font-medium">${escapeHtml(cat.label)}</span>
                            <span class="text-sm font-medium" style="color: ${catColor}">${cat.correct}/${cat.total} (${catPct}%)</span>
                        </div>
                        <div class="category-bar">
                            <div class="category-bar-fill" style="width: ${catPct}%; background: ${catColor}"></div>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>

        ${wrong.length > 0 ? `
        <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-4">
            <h3 class="font-bold mb-3 text-mendix-red">Falsche Antworten (${wrong.length})</h3>
            <div class="space-y-4">
                ${wrong.map(a => `
                    <div class="border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="badge-${escapeHtml(a.category)} text-xs px-2 py-0.5 rounded-full text-white font-medium">${escapeHtml(a.categoryLabel)}</span>
                        </div>
                        <p class="text-sm font-medium mb-2">${escapeHtml(a.question)}</p>
                        <p class="text-xs text-mendix-red mb-1">Deine Antwort: ${letters[a.selected]}. ${escapeHtml(a.options[a.selected])}</p>
                        <p class="text-xs text-mendix-green mb-2">Richtig: ${letters[a.correct]}. ${escapeHtml(a.options[a.correct])}</p>
                        <p class="text-xs text-gray-400">${escapeHtml(a.explanation)}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : '<p class="text-center text-mendix-green font-bold mb-4">Alle Fragen richtig! Perfekt!</p>'}

        <div class="grid grid-cols-2 gap-3">
            <button data-action="navigate" data-screen="categories" data-exam="${escapeHtml(state.exam)}" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition">
                Zur\u00FCck
            </button>
            ${wrong.length > 0 ? `
            <button data-action="retryWrong" class="bg-${color} hover:opacity-90 text-white font-bold py-3 rounded-xl transition">
                Falsche wiederholen
            </button>` : `
            <button data-action="startQuiz" data-exam="${escapeHtml(state.exam)}" data-category="${escapeHtml(state.category)}" data-count="${PRACTICE_COUNT}" class="bg-${color} hover:opacity-90 text-white font-bold py-3 rounded-xl transition">
                Nochmal
            </button>`}
        </div>

        ${renderFooter()}
    </div>`;
}

function buildCategoryBreakdown() {
    const catMap = {};
    state.sessionAnswers.forEach(a => {
        const key = a.category || 'unknown';
        if (!catMap[key]) {
            catMap[key] = { key, label: a.categoryLabel || key, total: 0, correct: 0 };
        }
        catMap[key].total++;
        if (a.isCorrect) catMap[key].correct++;
    });
    return Object.values(catMap).sort((a, b) => {
        const pctA = a.total > 0 ? a.correct / a.total : 0;
        const pctB = b.total > 0 ? b.correct / b.total : 0;
        return pctA - pctB;
    });
}
