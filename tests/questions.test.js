import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const store = {};
vi.stubGlobal('localStorage', {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
});

import { clearProgressCache, saveProgress } from '../src/persistence.js';
import {
    getQuestions,
    setQuestionSources,
    getTotalQuestionCount,
    examColor,
    getCategories,
    getCategoryProgress,
    getExamProgress,
    selectQuestions,
} from '../src/questions.js';

const MOCK_QUESTIONS = {
    intermediate: [
        { id: 'int-1', category: 'xpath', categoryLabel: 'XPath', question: 'Q1', options: ['A', 'B', 'C', 'D'], correct: 0, explanation: 'E1' },
        { id: 'int-2', category: 'xpath', categoryLabel: 'XPath', question: 'Q2', options: ['A', 'B', 'C', 'D'], correct: 1, explanation: 'E2' },
        { id: 'int-3', category: 'microflows', categoryLabel: 'Microflows', question: 'Q3', options: ['A', 'B', 'C', 'D'], correct: 2, explanation: 'E3' },
        { id: 'int-4', category: 'microflows', categoryLabel: 'Microflows', question: 'Q4', options: ['A', 'B', 'C', 'D'], correct: 3, explanation: 'E4' },
        { id: 'int-5', category: 'domain', categoryLabel: 'Domain Model', question: 'Q5', options: ['A', 'B', 'C', 'D'], correct: 0, explanation: 'E5' },
    ],
    advanced: [
        { id: 'adv-1', category: 'performance', categoryLabel: 'Performance', question: 'AQ1', options: ['A', 'B', 'C', 'D'], correct: 1, explanation: 'AE1' },
        { id: 'adv-2', category: 'security', categoryLabel: 'Security', question: 'AQ2', options: ['A', 'B', 'C', 'D'], correct: 2, explanation: 'AE2' },
    ],
};

describe('questions', () => {
    beforeEach(() => {
        Object.keys(store).forEach(k => delete store[k]);
        clearProgressCache();
        setQuestionSources(MOCK_QUESTIONS);
    });

    describe('getQuestions', () => {
        it('returns intermediate questions', () => {
            expect(getQuestions('intermediate')).toHaveLength(5);
        });

        it('returns advanced questions', () => {
            expect(getQuestions('advanced')).toHaveLength(2);
        });

        it('returns empty array for unknown exam', () => {
            expect(getQuestions('unknown')).toEqual([]);
        });
    });

    describe('getTotalQuestionCount', () => {
        it('counts all questions', () => {
            const counts = getTotalQuestionCount();
            expect(counts.intermediate).toBe(5);
            expect(counts.advanced).toBe(2);
            expect(counts.total).toBe(7);
        });
    });

    describe('examColor', () => {
        it('returns blue for intermediate', () => {
            expect(examColor('intermediate')).toBe('mendix-blue');
        });

        it('returns purple for advanced', () => {
            expect(examColor('advanced')).toBe('mendix-purple');
        });
    });

    describe('getCategories', () => {
        it('groups intermediate questions by category', () => {
            const cats = getCategories('intermediate');
            expect(cats).toHaveLength(3);
            const xpath = cats.find(c => c.key === 'xpath');
            expect(xpath.count).toBe(2);
            const micro = cats.find(c => c.key === 'microflows');
            expect(micro.count).toBe(2);
            const domain = cats.find(c => c.key === 'domain');
            expect(domain.count).toBe(1);
        });
    });

    describe('getCategoryProgress', () => {
        it('returns zeros for no progress', () => {
            const p = getCategoryProgress('intermediate', 'xpath');
            expect(p).toEqual({ total: 2, answered: 0, correct: 0, mastered: 0 });
        });

        it('returns progress for all categories', () => {
            const p = getCategoryProgress('intermediate', 'all');
            expect(p.total).toBe(5);
        });
    });

    describe('getExamProgress', () => {
        it('returns overall exam progress', () => {
            const p = getExamProgress('intermediate');
            expect(p.total).toBe(5);
        });
    });

    describe('selectQuestions', () => {
        it('selects correct number of questions', () => {
            const selected = selectQuestions('intermediate', 'all', 3);
            expect(selected).toHaveLength(3);
        });

        it('filters by category', () => {
            const selected = selectQuestions('intermediate', 'xpath', 10);
            expect(selected).toHaveLength(2);
            expect(selected.every(q => q.category === 'xpath')).toBe(true);
        });

        it('returns all questions when count exceeds available', () => {
            const selected = selectQuestions('intermediate', 'domain', 100);
            expect(selected).toHaveLength(1);
        });

        it('prioritizes unseen questions', () => {
            // Record answers for some questions so they're "seen"
            saveProgress({
                'int-1': { attempts: 5, correct: 5, lastSeen: Date.now(), streak: 5 },
                'int-2': { attempts: 5, correct: 5, lastSeen: Date.now(), streak: 5 },
                'int-3': { attempts: 5, correct: 5, lastSeen: Date.now(), streak: 5 },
                'int-4': { attempts: 5, correct: 5, lastSeen: Date.now(), streak: 5 },
            });
            clearProgressCache();

            // Select 1 question — should prefer the unseen one (int-5)
            const results = [];
            for (let i = 0; i < 20; i++) {
                const selected = selectQuestions('intermediate', 'all', 1);
                results.push(selected[0].id);
            }
            // int-5 (unseen, priority 120+) should appear much more than mastered ones (priority 10+)
            const unseenCount = results.filter(id => id === 'int-5').length;
            expect(unseenCount).toBeGreaterThan(10);
        });
    });
});
