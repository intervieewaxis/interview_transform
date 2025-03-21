"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCustomSection = exports.customSectionSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.customSectionSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    date: zod_1.z.string(),
    location: zod_1.z.string(),
    summary: zod_1.z.string(),
    keywords: zod_1.z.array(zod_1.z.string()).default([]),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultCustomSection = Object.assign(Object.assign({}, shared_1.defaultItem), { name: "", description: "", date: "", location: "", summary: "", keywords: [], url: shared_1.defaultUrl });
