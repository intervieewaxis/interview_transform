"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultEducation = exports.educationSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.educationSchema = shared_1.itemSchema.extend({
    institution: zod_1.z.string().min(1),
    studyType: zod_1.z.string(),
    area: zod_1.z.string(),
    score: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultEducation = Object.assign(Object.assign({}, shared_1.defaultItem), { id: "", institution: "", studyType: "", area: "", score: "", date: "", summary: "", url: shared_1.defaultUrl });
