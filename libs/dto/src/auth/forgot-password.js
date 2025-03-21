"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordDto = exports.forgotPasswordSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.forgotPasswordSchema = zod_1.z.object({ email: zod_1.z.string().email() });
class ForgotPasswordDto extends (0, dto_1.createZodDto)(exports.forgotPasswordSchema) {
}
exports.ForgotPasswordDto = ForgotPasswordDto;
