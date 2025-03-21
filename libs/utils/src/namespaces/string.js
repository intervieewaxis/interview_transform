"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLayoutLocator = exports.processUsername = exports.generateRandomName = exports.extractUrl = exports.isEmptyString = exports.isUrl = exports.getInitials = void 0;
const unique_names_generator_1 = require("unique-names-generator");
const getInitials = (name) => {
    var _a, _b, _c, _d;
    // eslint-disable-next-line unicorn/better-regex
    const regex = new RegExp(/(\p{L}{1})\p{L}+/gu);
    const initials = [...name.matchAll(regex)];
    return (((_b = (_a = initials.shift()) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "") + ((_d = (_c = initials.pop()) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : "")).toUpperCase();
};
exports.getInitials = getInitials;
const isUrl = (string) => {
    if (!string)
        return false;
    const urlRegex = /https?:\/\/[^\n ]+/i;
    return urlRegex.test(string);
};
exports.isUrl = isUrl;
const isEmptyString = (string) => {
    if (string === "<p></p>")
        return true;
    return string.trim().length === 0;
};
exports.isEmptyString = isEmptyString;
const extractUrl = (string) => {
    const urlRegex = /https?:\/\/[^\n ]+/i;
    const result = urlRegex.exec(string);
    return result ? result[0] : null;
};
exports.extractUrl = extractUrl;
const generateRandomName = () => {
    return (0, unique_names_generator_1.uniqueNamesGenerator)({
        dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.adjectives, unique_names_generator_1.animals],
        style: "capital",
        separator: " ",
        length: 3,
    });
};
exports.generateRandomName = generateRandomName;
const processUsername = (string) => {
    if (!string)
        return "";
    return string.replace(/[^\d.A-Za-z-]/g, "").toLowerCase();
};
exports.processUsername = processUsername;
const parseLayoutLocator = (payload) => {
    if (!payload)
        return { page: 0, column: 0, section: 0 };
    const section = payload.index;
    const [page, column] = payload.containerId.split(".").map(Number);
    return { page, column, section };
};
exports.parseLayoutLocator = parseLayoutLocator;
