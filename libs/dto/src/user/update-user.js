"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.updateUserSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const user_1 = require("./user");
exports.updateUserSchema = user_1.userSchema.partial().pick({
    name: true,
    locale: true,
    username: true,
    email: true,
    picture: true,
});
class UpdateUserDto extends (0, dto_1.createZodDto)(exports.updateUserSchema) {
}
exports.UpdateUserDto = UpdateUserDto;
