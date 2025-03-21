"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLanguage = exports.languageSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.languageSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    level: zod_1.z.coerce.number().min(0).max(5).default(1),
});
// Defaults
exports.defaultLanguage = Object.assign(Object.assign({}, shared_1.defaultItem), { name: "", description: "", level: 1 });
