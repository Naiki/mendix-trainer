// ============ CATEGORIES SCREEN ============
import { EXAM_QUESTION_COUNT, PRACTICE_COUNT } from '../constants.js';
import { state } from '../state.js';
import { escapeHtml } from '../utils.js';
import { examColor, getCategories, getCategoryProgress, getExamProgress } from '../questions.js';
import { renderFooter } from './shared.js';

export function renderCategories() {
    const categories = getCategories(state.exam);
    const examLabel = state.exam === 'intermediate' ? 'Intermediate' : 'Advanced';
    const color = examColor(state.exam);
    const allProgress = getExamProgress(state.exam);

    return `
    <div class="fade-in">
        <div class="flex items-center justify-between mb-6">
            <button data-action="navigate" data-screen="home" class="text-gray-400 hover:text-white transition py-2 px-1">
                \u2190 Zur\u00FCck
            </button>
            <h2 class="text-xl font-bold text-${color}">${escapeHtml(examLabel)}</h2>
            <button data-action="navigate" data-screen="stats" data-exam="${escapeHtml(state.exam)}" class="text-gray-400 hover:text-white transition text-sm py-2 px-1">
                Statistik
            </button>
        </div>

        <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-4 card-hover cursor-pointer"
             data-action="startQuiz" data-exam="${escapeHtml(state.exam)}" data-category="exam" data-count="${EXAM_QUESTION_COUNT}" role="button" tabindex="0">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-bold text-mendix-orange">Pr\u00FCfungssimulation</h3>
                    <p class="text-xs text-gray-400">${EXAM_QUESTION_COUNT} Fragen, ${state.exam === 'intermediate' ? '90' : '120'} Min Timer</p>
                </div>
                <span class="text-mendix-orange text-sm">Starten \u2192</span>
            </div>
        </div>

        <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-4 card-hover cursor-pointer"
             data-action="startQuiz" data-exam="${escapeHtml(state.exam)}" data-category="all" data-count="${PRACTICE_COUNT}" role="button" tabindex="0">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-bold">Alle Kategorien</h3>
                    <p class="text-xs text-gray-400">${allProgress.total} Fragen, priorisiert nach Schw\u00E4chen</p>
                </div>
                <span class="text-${color} text-sm">Starten \u2192</span>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            ${categories.map(cat => renderCategoryCard(cat, state.exam)).join('')}
        </div>

        ${renderFooter()}
    </div>`;
}

function renderCategoryCard(cat, exam) {
    const progress = getCategoryProgress(exam, cat.key);
    const pct = progress.total > 0 ? Math.round((progress.mastered / progress.total) * 100) : 0;
    const answeredPct = progress.total > 0 ? Math.round((progress.answered / progress.total) * 100) : 0;

    return `
    <div class="bg-gray-900 rounded-xl p-4 border border-gray-800 card-hover cursor-pointer"
         data-action="startQuiz" data-exam="${escapeHtml(exam)}" data-category="${escapeHtml(cat.key)}" role="button" tabindex="0">
        <div class="flex justify-between items-start mb-2">
            <span class="badge-${escapeHtml(cat.key)} text-xs px-2 py-0.5 rounded-full text-white font-medium">${escapeHtml(cat.label)}</span>
            <span class="text-xs text-gray-400">${progress.answered}/${progress.total}</span>
        </div>
        <div class="w-full bg-gray-800 rounded-full h-1.5 mt-2">
            <div class="bg-mendix-green h-1.5 rounded-full progress-fill" style="width: ${pct}%"></div>
        </div>
        <div class="flex justify-between mt-1">
            <span class="text-xs text-gray-400">${pct}% gemeistert</span>
            <span class="text-xs text-gray-400">${answeredPct}% gesehen</span>
        </div>
    </div>`;
}
