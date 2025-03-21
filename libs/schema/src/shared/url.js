"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultUrl = exports.urlSchema = void 0;
const zod_1 = require("zod");
// Schema
exports.urlSchema = zod_1.z.object({
    label: zod_1.z.string(),
    href: zod_1.z.literal("").or(zod_1.z.string().url()),
});
// Defaults
exports.defaultUrl = {
    label: "",
    href: "",
};
