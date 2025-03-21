"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProject = exports.projectSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.projectSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    keywords: zod_1.z.array(zod_1.z.string()).default([]),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultProject = Object.assign(Object.assign({}, shared_1.defaultItem), { name: "", description: "", date: "", summary: "", keywords: [], url: shared_1.defaultUrl });
