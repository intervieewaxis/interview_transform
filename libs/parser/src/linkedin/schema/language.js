"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageSchema = void 0;
const zod_1 = require("zod");
exports.languageSchema = zod_1.z.object({
    Name: zod_1.z.string(),
    Proficiency: zod_1.z.string().optional(),
});
