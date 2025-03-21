"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultVolunteer = exports.volunteerSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.volunteerSchema = shared_1.itemSchema.extend({
    organization: zod_1.z.string().min(1),
    position: zod_1.z.string(),
    location: zod_1.z.string(),
    date: zod_1.z.string(),
    summary: zod_1.z.string(),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultVolunteer = Object.assign(Object.assign({}, shared_1.defaultItem), { organization: "", position: "", location: "", date: "", summary: "", url: shared_1.defaultUrl });
