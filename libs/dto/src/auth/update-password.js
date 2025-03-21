"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordDto = exports.updatePasswordSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.updatePasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(6),
});
class UpdatePasswordDto extends (0, dto_1.createZodDto)(exports.updatePasswordSchema) {
}
exports.UpdatePasswordDto = UpdatePasswordDto;
