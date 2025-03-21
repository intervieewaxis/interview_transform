"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customFieldSchema = void 0;
const zod_1 = require("zod");
exports.customFieldSchema = zod_1.z.object({
    id: zod_1.z.string().cuid2(), // `id` is required
    icon: zod_1.z.string().default(""), // Make `icon` optional
    name: zod_1.z.string().default(""), // Make `name` optional
    value: zod_1.z.string().default(""), // Make `value` optional
    label: zod_1.z.string().default(""), // Add `label` to match your data
    href: zod_1.z.string().default(""), // Add `href` to match your data
});
