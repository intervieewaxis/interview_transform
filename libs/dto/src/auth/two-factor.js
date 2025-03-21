"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorBackupDto = exports.twoFactorBackupSchema = exports.BackupCodesDto = exports.backupCodesSchema = exports.TwoFactorDto = exports.twoFactorSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.twoFactorSchema = zod_1.z.object({
    code: zod_1.z
        .string()
        .length(6, { message: "Code must be a 6 digit number" })
        .regex(/^\d+$/, { message: "Code must be a 6 digit number" }),
});
class TwoFactorDto extends (0, dto_1.createZodDto)(exports.twoFactorSchema) {
}
exports.TwoFactorDto = TwoFactorDto;
exports.backupCodesSchema = zod_1.z.object({
    backupCodes: zod_1.z.array(zod_1.z.string().length(10)),
});
class BackupCodesDto extends (0, dto_1.createZodDto)(exports.backupCodesSchema) {
}
exports.BackupCodesDto = BackupCodesDto;
exports.twoFactorBackupSchema = zod_1.z.object({
    code: zod_1.z.string().length(10),
});
class TwoFactorBackupDto extends (0, dto_1.createZodDto)(exports.twoFactorBackupSchema) {
}
exports.TwoFactorBackupDto = TwoFactorBackupDto;
