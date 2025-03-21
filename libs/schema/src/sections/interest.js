"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultInterest = exports.interestSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.interestSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    keywords: zod_1.z.array(zod_1.z.string()).default([]),
});
// Defaults
exports.defaultInterest = Object.assign(Object.assign({}, shared_1.defaultItem), { name: "", keywords: [] });
