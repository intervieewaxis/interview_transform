"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSchema = void 0;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z.object({
    "Email Address": zod_1.z.string().email(),
    Confirmed: zod_1.z.enum(["Yes", "No"]),
    Primary: zod_1.z.enum(["Yes", "No"]),
    "Updated On": zod_1.z.string(),
});
