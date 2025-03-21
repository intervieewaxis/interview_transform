"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretsSchema = void 0;
const schema_1 = require("@reactive-resume/schema");
const zod_1 = require("zod");
exports.secretsSchema = zod_1.z.object({
    id: schema_1.idSchema,
    password: zod_1.z.string().nullable(),
    lastSignedIn: zod_1.z.date().nullable(),
    verificationToken: zod_1.z.string().nullable(),
    twoFactorSecret: zod_1.z.string().nullable(),
    twoFactorBackupCodes: zod_1.z.array(zod_1.z.string()).default([]),
    refreshToken: zod_1.z.string().nullable(),
    resetToken: zod_1.z.string().nullable(),
    userId: schema_1.idSchema,
});
