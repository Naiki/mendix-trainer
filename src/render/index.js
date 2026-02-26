// ============ RENDER ENGINE ============
import { state } from '../state.js';
import { renderError } from './shared.js';
import { renderHome } from './home.js';
import { renderCategories } from './categories.js';
import { renderQuiz } from './quiz.js';
import { renderResults } from './results.js';
import { renderStats } from './stats.js';

const SCREENS = {
    home: renderHome,
    categories: renderCategories,
    quiz: renderQuiz,
    results: renderResults,
    stats: renderStats,
};

export function render() {
    const app = document.getElementById('app');
    try {
        const renderer = SCREENS[state.screen] || SCREENS.home;
        app.innerHTML = renderer();
    } catch (error) {
        console.error('Render-Fehler:', error);
        app.innerHTML = renderError(error);
    }
}
