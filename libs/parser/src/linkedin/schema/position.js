"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionSchema = void 0;
const zod_1 = require("zod");
exports.positionSchema = zod_1.z.object({
    "Company Name": zod_1.z.string(),
    Title: zod_1.z.string(),
    Description: zod_1.z.string().optional(),
    Location: zod_1.z.string(),
    "Started On": zod_1.z.string(),
    "Finished On": zod_1.z.string().optional(),
});
