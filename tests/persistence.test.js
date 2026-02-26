import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage before importing module
const store = {};
const localStorageMock = {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
};
vi.stubGlobal('localStorage', localStorageMock);

const {
    loadProgress,
    saveProgress,
    clearProgressCache,
    getStreakData,
    updateStreak,
    getQuestionProgress,
    recordAnswer,
    resetAllProgress,
} = await import('../src/persistence.js');

describe('persistence', () => {
    beforeEach(() => {
        localStorageMock.clear();
        Object.keys(store).forEach(k => delete store[k]);
        clearProgressCache();
        vi.clearAllMocks();
    });

    describe('loadProgress / saveProgress', () => {
        it('returns empty object when no data exists', () => {
            expect(loadProgress()).toEqual({});
        });

        it('saves and loads progress', () => {
            const data = { 'q1': { attempts: 3, correct: 2, lastSeen: 1000, streak: 2 } };
            saveProgress(data);
            clearProgressCache(); // force reload from storage
            expect(loadProgress()).toEqual(data);
        });

        it('uses cache on second load', () => {
            loadProgress();
            loadProgress();
            // getItem called only once due to cache
            expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
        });
    });

    describe('recordAnswer', () => {
        it('tracks correct answer and increments streak', () => {
            recordAnswer('q1', true);
            clearProgressCache();
            const p = loadProgress()['q1'];
            expect(p.attempts).toBe(1);
            expect(p.correct).toBe(1);
            expect(p.streak).toBe(1);
        });

        it('resets streak on wrong answer', () => {
            recordAnswer('q1', true);
            recordAnswer('q1', true);
            recordAnswer('q1', false);
            clearProgressCache();
            const p = loadProgress()['q1'];
            expect(p.attempts).toBe(3);
            expect(p.correct).toBe(2);
            expect(p.streak).toBe(0);
        });

        it('sets lastSeen timestamp', () => {
            const before = Date.now();
            recordAnswer('q1', true);
            clearProgressCache();
            const p = loadProgress()['q1'];
            expect(p.lastSeen).toBeGreaterThanOrEqual(before);
        });
    });

    describe('getQuestionProgress', () => {
        it('returns defaults for unknown question', () => {
            const p = getQuestionProgress('unknown-id');
            expect(p).toEqual({ attempts: 0, correct: 0, lastSeen: 0, streak: 0 });
        });
    });

    describe('getStreakData', () => {
        it('returns defaults when no streak exists', () => {
            expect(getStreakData()).toEqual({ current: 0, lastDate: null });
        });
    });

    describe('updateStreak', () => {
        it('starts streak at 1 on first use', () => {
            const result = updateStreak();
            expect(result.current).toBe(1);
            expect(result.lastDate).toBe(new Date().toISOString().slice(0, 10));
        });

        it('does not double-count same day', () => {
            updateStreak();
            const result = updateStreak();
            expect(result.current).toBe(1);
        });
    });

    describe('resetAllProgress', () => {
        it('clears all data', () => {
            recordAnswer('q1', true);
            updateStreak();
            resetAllProgress();
            clearProgressCache();
            expect(loadProgress()).toEqual({});
            expect(getStreakData()).toEqual({ current: 0, lastDate: null });
        });
    });
});
