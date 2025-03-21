"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const object_1 = require("../object");
(0, vitest_1.describe)("exclude", () => {
    (0, vitest_1.it)("excludes specified keys from the object", () => {
        const object = {
            id: 1,
            name: "Alice",
            age: 30,
            email: "alice@example.com",
        };
        const result = (0, object_1.exclude)(object, ["age", "email"]);
        (0, vitest_1.expect)(result).toEqual({ id: 1, name: "Alice" });
        (0, vitest_1.expect)(result).not.toHaveProperty("age");
        (0, vitest_1.expect)(result).not.toHaveProperty("email");
    });
    (0, vitest_1.it)("returns the same object if no keys are specified", () => {
        const object = {
            id: 1,
            name: "Alice",
            age: 30,
            email: "alice@example.com",
        };
        const keysToExclude = [];
        const result = (0, object_1.exclude)(object, keysToExclude);
        (0, vitest_1.expect)(result).toEqual(object);
    });
    (0, vitest_1.it)("does not modify the original object", () => {
        const object = {
            id: 1,
            name: "Alice",
            age: 30,
            email: "alice@example.com",
        };
        (0, object_1.exclude)(object, ["age", "email"]);
        (0, vitest_1.expect)(object).toHaveProperty("age");
        (0, vitest_1.expect)(object).toHaveProperty("email");
    });
    (0, vitest_1.it)("handles cases where keys to exclude are not present in the object", () => {
        const object = {
            id: 1,
            name: "Alice",
            age: 30,
            email: "alice@example.com",
        };
        const keysToExclude = ["nonExistentKey"];
        const result = (0, object_1.exclude)(object, keysToExclude);
        (0, vitest_1.expect)(result).toEqual(object);
    });
    (0, vitest_1.it)("returns the input if it is not an object", () => {
        const object = null;
        const keysToExclude = ["id"];
        // @ts-expect-error passing invalid input type for tests
        const result = (0, object_1.exclude)(object, keysToExclude);
        (0, vitest_1.expect)(result).toBeNull();
    });
});
