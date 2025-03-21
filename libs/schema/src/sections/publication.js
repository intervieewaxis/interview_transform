"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPublication = exports.publicationSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.publicationSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    publisher: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultPublication = Object.assign(Object.assign({}, shared_1.defaultItem), { name: "", publisher: "", date: "", summary: "", url: shared_1.defaultUrl });
