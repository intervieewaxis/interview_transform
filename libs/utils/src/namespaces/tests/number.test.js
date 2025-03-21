"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const number_1 = require("../number");
(0, vitest_1.describe)("linearTransform", () => {
    (0, vitest_1.it)("transforms values from one range to another", () => {
        const value = 5;
        const result = (0, number_1.linearTransform)(value, 0, 10, 0, 100);
        (0, vitest_1.expect)(result).toBe(50);
    });
    (0, vitest_1.it)("handles negative ranges", () => {
        const value = -5;
        const result = (0, number_1.linearTransform)(value, -10, 0, 0, 100);
        (0, vitest_1.expect)(result).toBe(50);
    });
    (0, vitest_1.it)("correctly transforms the minimum input value to the minimum output value", () => {
        const value = 0;
        const result = (0, number_1.linearTransform)(value, 0, 10, 0, 100);
        (0, vitest_1.expect)(result).toBe(0);
    });
    (0, vitest_1.it)("correctly transforms the maximum input value to the maximum output value", () => {
        const value = 10;
        const result = (0, number_1.linearTransform)(value, 0, 10, 0, 100);
        (0, vitest_1.expect)(result).toBe(100);
    });
    (0, vitest_1.it)("transforms values outside the input range", () => {
        const value = 15;
        const result = (0, number_1.linearTransform)(value, 0, 10, 0, 100);
        (0, vitest_1.expect)(result).toBe(150);
    });
    (0, vitest_1.it)("handles inverted output ranges", () => {
        const value = 5;
        const result = (0, number_1.linearTransform)(value, 0, 10, 100, 0);
        (0, vitest_1.expect)(result).toBe(50);
    });
    (0, vitest_1.it)("returns NaN if input maximum equals input minimum", () => {
        const value = 5;
        const result = (0, number_1.linearTransform)(value, 0, 0, 0, 100);
        (0, vitest_1.expect)(result).toBe(Number.NaN);
    });
    (0, vitest_1.it)("returns NaN if input range is zero (avoids division by zero)", () => {
        const value = 5;
        const result = (0, number_1.linearTransform)(value, 10, 10, 0, 100);
        (0, vitest_1.expect)(result).toBeNaN();
    });
});
