"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationSchema = void 0;
const zod_1 = require("zod");
exports.educationSchema = zod_1.z.object({
    "School Name": zod_1.z.string(),
    "Start Date": zod_1.z.string(),
    "End Date": zod_1.z.string().optional(),
    Notes: zod_1.z.string().optional(),
    "Degree Name": zod_1.z.string(),
    Activities: zod_1.z.string(),
});
