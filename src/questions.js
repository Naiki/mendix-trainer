// ============ QUESTION HELPERS ============
import { MASTERY_STREAK } from './constants.js';
import { loadProgress } from './persistence.js';
import { shuffleArray } from './utils.js';
import { INTERMEDIATE_QUESTIONS } from '../questions-intermediate.js';
import { ADVANCED_QUESTIONS } from '../questions-advanced.js';

const QUESTION_DATA = {
    intermediate: INTERMEDIATE_QUESTIONS,
    advanced: ADVANCED_QUESTIONS,
};

// Allow injection for testing
let _questionSources = null;

export function setQuestionSources(sources) {
    _questionSources = sources;
}

export function getQuestions(exam) {
    if (_questionSources) {
        return _questionSources[exam] || [];
    }
    return QUESTION_DATA[exam] || [];
}

export function getTotalQuestionCount() {
    const intCount = getQuestions('intermediate').length;
    const advCount = getQuestions('advanced').length;
    return { intermediate: intCount, advanced: advCount, total: intCount + advCount };
}

export function examColor(exam) {
    return exam === 'intermediate' ? 'mendix-blue' : 'mendix-purple';
}

export function getCategories(exam) {
    const questions = getQuestions(exam);
    const cats = {};
    questions.forEach(q => {
        if (!cats[q.category]) {
            cats[q.category] = { key: q.category, label: q.categoryLabel, count: 0 };
        }
        cats[q.category].count++;
    });
    return Object.values(cats);
}

export function getCategoryProgress(exam, categoryKey) {
    const progress = loadProgress();
    const questions = getQuestions(exam).filter(q => categoryKey === 'all' || q.category === categoryKey);
    let answered = 0, correct = 0, mastered = 0;
    questions.forEach(q => {
        const p = progress[q.id];
        if (p && p.attempts > 0) {
            answered++;
            if (p.correct > 0) correct++;
            if (p.streak >= MASTERY_STREAK) mastered++;
        }
    });
    return { total: questions.length, answered, correct, mastered };
}

export function getExamProgress(exam) {
    return getCategoryProgress(exam, 'all');
}

export function selectQuestions(exam, categoryKey, count) {
    let questions = getQuestions(exam);
    if (categoryKey !== 'all' && categoryKey !== 'exam') {
        questions = questions.filter(q => q.category === categoryKey);
    }

    const progress = loadProgress();

    // Spaced repetition: prioritize questions with low streak or never seen
    const scored = questions.map(q => {
        const p = progress[q.id] || { attempts: 0, streak: 0, lastSeen: 0 };
        let priority = 100;
        if (p.streak >= MASTERY_STREAK) priority = 10;           // mastered
        else if (p.streak >= MASTERY_STREAK - 1) priority = 30;  // learning
        else if (p.attempts > 0 && p.streak === 0) priority = 150; // got wrong recently
        else if (p.attempts === 0) priority = 120;               // never seen
        // Add time decay
        const hoursSince = (Date.now() - p.lastSeen) / (1000 * 60 * 60);
        priority += Math.min(hoursSince * 2, 50);
        return { question: q, priority };
    });

    // Sort by priority (highest first), then shuffle within similar priorities
    scored.sort((a, b) => b.priority - a.priority);

    const selected = scored.slice(0, count || questions.length).map(s => s.question);
    return shuffleArray(selected);
}
