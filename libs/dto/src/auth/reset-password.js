"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordDto = exports.resetPasswordSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
class ResetPasswordDto extends (0, dto_1.createZodDto)(exports.resetPasswordSchema) {
}
exports.ResetPasswordDto = ResetPasswordDto;
