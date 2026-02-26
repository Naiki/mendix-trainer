// Mendix Trainer - Main Application (v3.1.0)
// Modular ES architecture, event delegation, zero runtime dependencies

import { PRACTICE_COUNT, EXAM_TIME } from './constants.js';
import { state } from './state.js';
import { shuffleArray } from './utils.js';
import { playCorrectBeep, playWrongBeep } from './audio.js';
import { recordAnswer, updateStreak, resetAllProgress, getNotificationSettings } from './persistence.js';
import { getQuestions, getExamProgress, selectQuestions } from './questions.js';
import { startTimer, stopTimer } from './timer.js';
import { render } from './render/index.js';
import { registerServiceWorker, toggleNotifications, updateReminderTime, scheduleNextReminder } from './notifications.js';

// ============ NAVIGATION ============
function navigate(screen, params = {}) {
    if (state.screen === 'quiz' && screen !== 'quiz') stopTimer();
    Object.assign(state, {
        screen,
        ...params,
        selectedAnswer: null,
        answered: false,
    });
    render();
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
        const heading = document.querySelector('h1, h2, h3');
        if (heading) heading.setAttribute('tabindex', '-1');
    });
}

function confirmQuitQuiz() {
    if (state.sessionTotal === 0 || confirm('Quiz wirklich abbrechen? Dein Fortschritt für diese Runde geht verloren.')) {
        stopTimer();
        navigate('categories', { exam: state.exam });
    }
}

function quickStart() {
    const intP = getExamProgress('intermediate');
    const advP = getExamProgress('advanced');
    const exam = advP.answered > intP.answered ? 'advanced' : 'intermediate';
    startQuiz(exam, 'all', PRACTICE_COUNT);
}

// ============ QUIZ ============
function startQuiz(exam, category, count) {
    const questions = selectQuestions(exam, category, count || 999);
    if (questions.length === 0) {
        alert('Keine Fragen in dieser Kategorie verfügbar.');
        return;
    }

    stopTimer();
    Object.assign(state, {
        exam,
        category,
        questions,
        questionIndex: 0,
        selectedAnswer: null,
        answered: false,
        sessionCorrect: 0,
        sessionTotal: 0,
        sessionAnswers: [],
    });
    navigate('quiz');
    if (category === 'exam') startTimer(EXAM_TIME[exam], () => navigate('results'));
}

function answerQuestion(index) {
    if (state.answered) return;
    const q = state.questions[state.questionIndex];

    state.selectedAnswer = index;
    state.answered = true;
    state.sessionTotal++;

    const isCorrect = index === q._shuffledCorrect;
    if (isCorrect) {
        state.sessionCorrect++;
        playCorrectBeep();
    } else {
        playWrongBeep();
    }

    const originalSelected = q._shuffleMap[index];
    state.sessionAnswers.push({
        questionId: q.id,
        question: q.question,
        selected: originalSelected,
        correct: q.correct,
        isCorrect,
        options: q.options,
        explanation: q.explanation,
        category: q.category,
        categoryLabel: q.categoryLabel,
    });

    recordAnswer(q.id, isCorrect);
    updateStreak();
    render();

    requestAnimationFrame(() => {
        const el = document.getElementById('explanation-box');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

function nextQuestion() {
    state.questionIndex++;
    state.selectedAnswer = null;
    state.answered = false;

    if (state.questionIndex >= state.questions.length) {
        stopTimer();
        navigate('results');
    } else {
        render();
        window.scrollTo(0, 0);
    }
}

function toggleAbout() {
    state.showAbout = !state.showAbout;
    render();
}

function resetProgress() {
    if (confirm('Wirklich allen Fortschritt zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
        resetAllProgress();
        navigate('home');
    }
}

function retryWrong() {
    const wrongIds = state.sessionAnswers.filter(a => !a.isCorrect).map(a => a.questionId);
    const allQuestions = getQuestions(state.exam);
    const wrongQuestions = shuffleArray(allQuestions.filter(q => wrongIds.includes(q.id)));

    if (wrongQuestions.length === 0) return;

    Object.assign(state, {
        questions: wrongQuestions,
        questionIndex: 0,
        selectedAnswer: null,
        answered: false,
        sessionCorrect: 0,
        sessionTotal: 0,
        sessionAnswers: [],
    });
    navigate('quiz');
}

// ============ EVENT DELEGATION ============
// Single click listener on #app — no inline onclick handlers needed
const ACTION_MAP = {
    navigate:           (el) => navigate(el.dataset.screen, { exam: el.dataset.exam }),
    quickStart:         () => quickStart(),
    startQuiz:          (el) => startQuiz(el.dataset.exam, el.dataset.category, Number(el.dataset.count) || undefined),
    answerQuestion:     (el) => answerQuestion(Number(el.dataset.index)),
    nextQuestion:       () => nextQuestion(),
    confirmQuitQuiz:    () => confirmQuitQuiz(),
    toggleAbout:        () => toggleAbout(),
    resetProgress:      () => resetProgress(),
    retryWrong:         () => retryWrong(),
    toggleNotifications:() => toggleNotifications(() => render()),
    toggleInstallDetails:(el) => {
        const details = el.querySelector('.install-details');
        if (details) details.classList.toggle('hidden');
    },
    reload:             () => location.reload(),
};

document.getElementById('app').addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const handler = ACTION_MAP[el.dataset.action];
    if (handler) handler(el);
});

// Handle <input> changes via event delegation (e.g. time picker)
document.getElementById('app').addEventListener('change', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.dataset.action === 'updateReminderTime') {
        updateReminderTime(el.value);
    }
});

// Handle keyboard activation on [role="button"] and [role="switch"]
document.getElementById('app').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.getAttribute('role') === 'button' || el.getAttribute('role') === 'switch') {
        e.preventDefault();
        el.click();
    }
});

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    if (state.screen !== 'quiz') return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (!state.answered) {
        const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
        const index = keyMap[e.key.toLowerCase()];
        if (index !== undefined && index < state.questions[state.questionIndex]?.options.length) {
            answerQuestion(index);
        }
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextQuestion();
    }

    if (e.key === 'Escape') {
        confirmQuitQuiz();
    }
});

// ============ INIT ============
registerServiceWorker();

const _notifSettings = getNotificationSettings();
if (_notifSettings.enabled) {
    scheduleNextReminder();
}

render();
