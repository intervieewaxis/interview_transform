"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const string_1 = require("../string");
(0, vitest_1.describe)("getInitials", () => {
    (0, vitest_1.it)("returns the initials of a name", () => {
        (0, vitest_1.expect)((0, string_1.getInitials)("John Doe")).toBe("JD");
        (0, vitest_1.expect)((0, string_1.getInitials)("Mary Jane Watson")).toBe("MW");
    });
});
(0, vitest_1.describe)("isUrl", () => {
    (0, vitest_1.it)("checks if a string is a URL", () => {
        (0, vitest_1.expect)((0, string_1.isUrl)("https://example.com")).toBe(true);
        (0, vitest_1.expect)((0, string_1.isUrl)("not a url")).toBe(false);
    });
});
(0, vitest_1.describe)("isEmptyString", () => {
    (0, vitest_1.it)("checks if a string is empty or only contains whitespace", () => {
        (0, vitest_1.expect)((0, string_1.isEmptyString)("")).toBe(true);
        (0, vitest_1.expect)((0, string_1.isEmptyString)(" ")).toBe(true);
        (0, vitest_1.expect)((0, string_1.isEmptyString)("<p></p>")).toBe(true);
        (0, vitest_1.expect)((0, string_1.isEmptyString)("not empty")).toBe(false);
    });
});
(0, vitest_1.describe)("extractUrl", () => {
    (0, vitest_1.it)("extracts a URL from a string", () => {
        (0, vitest_1.expect)((0, string_1.extractUrl)("Visit https://example.com today!")).toBe("https://example.com");
        (0, vitest_1.expect)((0, string_1.extractUrl)("No URL here.")).toBeNull();
    });
});
(0, vitest_1.describe)("generateRandomName", () => {
    (0, vitest_1.it)("generates a random name", () => {
        const name = (0, string_1.generateRandomName)();
        (0, vitest_1.expect)(name).toMatch(/^(?:[A-Z][a-z]+ ){2}[A-Z][a-z]+$/);
    });
});
(0, vitest_1.describe)("processUsername", () => {
    (0, vitest_1.it)("processes a username by removing non-alphanumeric characters", () => {
        (0, vitest_1.expect)((0, string_1.processUsername)("User@Name!")).toBe("username");
        (0, vitest_1.expect)((0, string_1.processUsername)("")).toBe("");
        (0, vitest_1.expect)((0, string_1.processUsername)(null)).toBe("");
    });
});
