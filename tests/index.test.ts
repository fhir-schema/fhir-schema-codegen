import { test } from '../src/index';

describe('ups', () => {
    it('should return hello message with the provided name', () => {
        const result = test('hello');
        expect(result).toBe('hello');
    });
}); 