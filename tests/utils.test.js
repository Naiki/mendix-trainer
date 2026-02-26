import { describe, it, expect } from 'vitest';
import { escapeHtml, shuffleArray } from '../src/utils.js';

describe('escapeHtml', () => {
    it('escapes HTML special characters', () => {
        expect(escapeHtml('<script>alert("xss")</script>')).toBe(
            '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
        );
    });

    it('escapes ampersands', () => {
        expect(escapeHtml('A & B')).toBe('A &amp; B');
    });

    it('escapes single quotes', () => {
        expect(escapeHtml("it's")).toBe('it&#039;s');
    });

    it('returns empty string for null/undefined', () => {
        expect(escapeHtml(null)).toBe('');
        expect(escapeHtml(undefined)).toBe('');
    });

    it('converts numbers to string', () => {
        expect(escapeHtml(42)).toBe('42');
    });

    it('passes through safe strings unchanged', () => {
        expect(escapeHtml('Hello World')).toBe('Hello World');
    });
});

describe('shuffleArray', () => {
    it('returns array of same length', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = shuffleArray(arr);
        expect(result).toHaveLength(5);
    });

    it('does not mutate the original array', () => {
        const arr = [1, 2, 3, 4, 5];
        const original = [...arr];
        shuffleArray(arr);
        expect(arr).toEqual(original);
    });

    it('contains all original elements', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = shuffleArray(arr);
        expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
    });

    it('handles empty array', () => {
        expect(shuffleArray([])).toEqual([]);
    });

    it('handles single element', () => {
        expect(shuffleArray([42])).toEqual([42]);
    });
});
