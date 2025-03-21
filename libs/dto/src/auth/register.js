"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = exports.registerSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
const user_1 = require("../user");
exports.registerSchema = user_1.userSchema
    .pick({ name: true, email: true, username: true, locale: true })
    .extend({ password: zod_1.z.string().min(6) });
class RegisterDto extends (0, dto_1.createZodDto)(exports.registerSchema) {
}
exports.RegisterDto = RegisterDto;
