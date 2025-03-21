"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadSchema = void 0;
const schema_1 = require("@reactive-resume/schema");
const zod_1 = require("zod");
exports.payloadSchema = zod_1.z.object({
    id: schema_1.idSchema,
    isTwoFactorAuth: zod_1.z.boolean().optional(),
});
