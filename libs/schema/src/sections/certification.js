"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCertification = exports.certificationSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.certificationSchema = shared_1.itemSchema.extend({
    name: zod_1.z.string().min(1),
    issuer: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultCertification = Object.assign(Object.assign({}, shared_1.defaultItem), { name: "", issuer: "", date: "", summary: "", url: shared_1.defaultUrl });
