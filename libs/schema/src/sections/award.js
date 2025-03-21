"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAward = exports.awardSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.awardSchema = shared_1.itemSchema.extend({
    title: zod_1.z.string().min(1),
    awarder: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultAward = Object.assign(Object.assign({}, shared_1.defaultItem), { title: "", awarder: "", date: "", summary: "", url: shared_1.defaultUrl });
