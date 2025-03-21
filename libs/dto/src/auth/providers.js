"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvidersDto = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
const authProvidersSchema = zod_1.z.array(zod_1.z.enum(["email", "github", "google", "openid"]));
class AuthProvidersDto extends (0, dto_1.createZodDto)(authProvidersSchema) {
}
exports.AuthProvidersDto = AuthProvidersDto;
