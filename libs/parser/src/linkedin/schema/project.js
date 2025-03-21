"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const zod_1 = require("zod");
exports.projectSchema = zod_1.z.object({
    Title: zod_1.z.string(),
    Description: zod_1.z.string(),
    Url: zod_1.z.literal("").or(zod_1.z.string().url()).optional(),
    "Started On": zod_1.z.string(),
    "Finished On": zod_1.z.string().optional(),
});
