"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificationSchema = void 0;
const zod_1 = require("zod");
exports.certificationSchema = zod_1.z.object({
    Name: zod_1.z.string(),
    Url: zod_1.z.string().url(),
    Authority: zod_1.z.string(),
    "Started On": zod_1.z.string(),
    "Finished On": zod_1.z.string().optional(),
    "License Number": zod_1.z.string(),
});
