"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const date_1 = require("../date");
(0, vitest_1.describe)("sortByDate", () => {
    (0, vitest_1.it)("sorts by date in descending order when desc is true", () => {
        const a = { date: new Date("2023-01-01") };
        const b = { date: new Date("2023-01-02") };
        (0, vitest_1.expect)((0, date_1.sortByDate)(a, b, "date")).toBe(1);
        (0, vitest_1.expect)((0, date_1.sortByDate)(b, a, "date")).toBe(-1);
    });
    (0, vitest_1.it)("sorts by date in ascending order when desc is false", () => {
        const a = { date: new Date("2023-01-01") };
        const b = { date: new Date("2023-01-02") };
        (0, vitest_1.expect)((0, date_1.sortByDate)(a, b, "date", false)).toBe(-1);
        (0, vitest_1.expect)((0, date_1.sortByDate)(b, a, "date", false)).toBe(1);
    });
    (0, vitest_1.it)("returns 0 if one of the dates is missing", () => {
        const a = { date: new Date("2023-01-01") };
        const b = {};
        (0, vitest_1.expect)((0, date_1.sortByDate)(a, b, "date")).toBe(0);
    });
    (0, vitest_1.it)("returns 0 if one of the values is not a date", () => {
        const a = { date: new Date("2023-01-01") };
        const b = { date: "2023-01-02" };
        (0, vitest_1.expect)((0, date_1.sortByDate)(a, b, "date")).toBe(0);
    });
    (0, vitest_1.it)("handles equal dates", () => {
        const a = { date: new Date("2023-01-01") };
        const b = { date: new Date("2023-01-01") };
        (0, vitest_1.expect)((0, date_1.sortByDate)(a, b, "date")).toBe(0);
        (0, vitest_1.expect)((0, date_1.sortByDate)(a, b, "date", false)).toBe(0);
    });
});
(0, vitest_1.describe)("deepSearchAndParseDates", () => {
    (0, vitest_1.it)("parses dates at various nesting levels", () => {
        const input = {
            level1: {
                date: "2021-08-17T00:00:00Z",
                nested: {
                    date: "2022-08-17T00:00:00Z",
                },
            },
            otherKey: "value",
        };
        const dateKeys = ["date"];
        const output = (0, date_1.deepSearchAndParseDates)(input, dateKeys);
        (0, vitest_1.expect)(output.level1.date).toBeInstanceOf(Date);
        (0, vitest_1.expect)(output.level1.nested.date).toBeInstanceOf(Date);
        (0, vitest_1.expect)(output.otherKey).toBe("value");
    });
    (0, vitest_1.it)("does not parse invalid date strings", () => {
        const input = {
            date: "not a date",
        };
        const dateKeys = ["date"];
        const output = (0, date_1.deepSearchAndParseDates)(input, dateKeys);
        (0, vitest_1.expect)(output.date).toBe("not a date");
    });
    (0, vitest_1.it)("does not modify non-object input", () => {
        const input = "2021-08-17T00:00:00Z";
        const dateKeys = ["date"];
        const output = (0, date_1.deepSearchAndParseDates)(input, dateKeys);
        (0, vitest_1.expect)(output).toBe(input);
    });
    (0, vitest_1.it)("returns null for null input", () => {
        const input = null;
        const dateKeys = ["date"];
        const output = (0, date_1.deepSearchAndParseDates)(input, dateKeys);
        (0, vitest_1.expect)(output).toBeNull();
    });
    (0, vitest_1.it)("handles arrays with date strings", () => {
        const input = ["2021-08-17T00:00:00Z", "2022-08-17"];
        const dateKeys = ["0", "1"]; // Assuming the keys are stringified indices
        const output = (0, date_1.deepSearchAndParseDates)(input, dateKeys);
        (0, vitest_1.expect)(output[0]).toBeInstanceOf(Date);
        (0, vitest_1.expect)(output[1]).toBeInstanceOf(Date);
    });
    (0, vitest_1.it)("ignores keys that are not in the dateKeys", () => {
        const input = {
            date: "2021-08-17T00:00:00Z",
            notADate: "2021-08-17T00:00:00Z",
        };
        const dateKeys = ["date"];
        const output = (0, date_1.deepSearchAndParseDates)(input, dateKeys);
        (0, vitest_1.expect)(output.date).toBeInstanceOf(Date);
        (0, vitest_1.expect)(output.notADate).toBe("2021-08-17T00:00:00Z");
    });
});
