"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseDto = exports.authResponseSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
const user_1 = require("../user");
exports.authResponseSchema = zod_1.z.object({
    status: zod_1.z.enum(["authenticated", "2fa_required"]),
    user: user_1.userSchema,
});
class AuthResponseDto extends (0, dto_1.createZodDto)(exports.authResponseSchema) {
}
exports.AuthResponseDto = AuthResponseDto;
