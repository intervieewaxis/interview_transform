"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultReference = exports.referenceSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.referenceSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultReference = Object.assign(Object.assign({}, shared_1.defaultItem), { name: "", description: "", summary: "", url: shared_1.defaultUrl });
