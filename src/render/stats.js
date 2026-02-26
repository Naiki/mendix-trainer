// ============ STATS SCREEN ============
import { state } from '../state.js';
import { escapeHtml } from '../utils.js';
import { loadProgress } from '../persistence.js';
import { getQuestions, examColor, getCategories, getCategoryProgress, getExamProgress } from '../questions.js';
import { renderFooter } from './shared.js';

export function renderStats() {
    const exam = state.exam;
    const categories = getCategories(exam);
    const examLabel = exam === 'intermediate' ? 'Intermediate' : 'Advanced';
    const color = examColor(exam);
    const overall = getExamProgress(exam);
    const progress = loadProgress();

    const catStats = categories.map(cat => {
        const questions = getQuestions(exam).filter(q => q.category === cat.key);
        let attempts = 0, correct = 0;
        questions.forEach(q => {
            const p = progress[q.id];
            if (p) {
                attempts += p.attempts;
                correct += p.correct;
            }
        });
        const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
        const prog = getCategoryProgress(exam, cat.key);
        return { ...cat, accuracy, ...prog };
    });

    catStats.sort((a, b) => a.accuracy - b.accuracy);

    return `
    <div class="fade-in">
        <div class="flex items-center justify-between mb-6">
            <button data-action="navigate" data-screen="categories" data-exam="${escapeHtml(exam)}" class="text-gray-400 hover:text-white transition py-2 px-1">
                \u2190 Zur\u00FCck
            </button>
            <h2 class="text-xl font-bold text-${color}">${escapeHtml(examLabel)} Statistik</h2>
            <div></div>
        </div>

        <div class="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
            <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                    <div class="text-2xl font-bold text-mendix-blue">${overall.answered}</div>
                    <div class="text-xs text-gray-400">Bearbeitet</div>
                </div>
                <div>
                    <div class="text-2xl font-bold text-mendix-green">${overall.mastered}</div>
                    <div class="text-xs text-gray-400">Gemeistert</div>
                </div>
                <div>
                    <div class="text-2xl font-bold">${overall.total}</div>
                    <div class="text-xs text-gray-400">Gesamt</div>
                </div>
            </div>
            <div class="w-full bg-gray-800 rounded-full h-2 mt-4">
                <div class="bg-mendix-green h-2 rounded-full progress-fill" style="width: ${overall.total > 0 ? Math.round((overall.mastered / overall.total) * 100) : 0}%"></div>
            </div>
        </div>

        <h3 class="font-bold mb-3">Kategorien (sortiert nach Genauigkeit)</h3>
        <div class="space-y-3">
            ${catStats.map(cat => {
                const accColor = cat.accuracy >= 75 ? 'text-mendix-green' : cat.accuracy >= 50 ? 'text-mendix-orange' : 'text-mendix-red';
                return `
                <div class="bg-gray-900 rounded-xl p-4 border border-gray-800">
                    <div class="flex justify-between items-center mb-2">
                        <span class="badge-${escapeHtml(cat.key)} text-xs px-2 py-0.5 rounded-full text-white font-medium">${escapeHtml(cat.label)}</span>
                        <span class="${accColor} font-bold">${cat.accuracy}%</span>
                    </div>
                    <div class="flex justify-between text-xs text-gray-400">
                        <span>${cat.answered}/${cat.total} bearbeitet</span>
                        <span>${cat.mastered} gemeistert</span>
                    </div>
                    <div class="w-full bg-gray-800 rounded-full h-1 mt-2">
                        <div class="bg-mendix-green h-1 rounded-full progress-fill" style="width: ${cat.total > 0 ? Math.round((cat.mastered / cat.total) * 100) : 0}%"></div>
                    </div>
                </div>`;
            }).join('')}
        </div>

        ${renderFooter()}
    </div>`;
}
