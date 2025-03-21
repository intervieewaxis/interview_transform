"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSkill = exports.skillSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.skillSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    level: zod_1.z.coerce.number().min(0).max(5).default(1),
    keywords: zod_1.z.array(zod_1.z.string()).default([]),
});
// Defaults
exports.defaultSkill = Object.assign(Object.assign({}, shared_1.defaultItem), { name: "", description: "", level: 1, keywords: [] });
