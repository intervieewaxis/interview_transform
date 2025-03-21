"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProfile = exports.profileSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.profileSchema = shared_1.itemSchema.extend({
    network: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1),
    icon: zod_1.z
        .string()
        .describe('Slug for the icon from https://simpleicons.org. For example, "github", "linkedin", etc.'),
    url: shared_1.urlSchema,
});
// Defaults
exports.defaultProfile = Object.assign(Object.assign({}, shared_1.defaultItem), { network: "", username: "", icon: "", url: shared_1.defaultUrl });
