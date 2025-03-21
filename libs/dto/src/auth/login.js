"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = exports.loginSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
const user_1 = require("../user");
exports.loginSchema = zod_1.z
    .object({
    identifier: zod_1.z.string().transform((value) => value.toLowerCase()),
    password: zod_1.z.string().min(6),
})
    .refine((value) => {
    return value.identifier.includes("@")
        ? zod_1.z.string().email().parse(value.identifier)
        : user_1.usernameSchema.parse(value.identifier);
}, { message: "InvalidCredentials" });
class LoginDto extends (0, dto_1.createZodDto)(exports.loginSchema) {
}
exports.LoginDto = LoginDto;
