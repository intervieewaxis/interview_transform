"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithSecrets = exports.userWithSecretsSchema = exports.UserDto = exports.userSchema = exports.usernameSchema = void 0;
const schema_1 = require("@reactive-resume/schema");
const utils_1 = require("@reactive-resume/utils");
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
const secrets_1 = require("../secrets");
exports.usernameSchema = zod_1.z
    .string()
    .min(3)
    .max(255)
    .regex(/^[\w.-]+$/, {
    message: "Usernames can only contain letters, numbers, periods, hyphens, and underscores.",
})
    .transform((value) => value.toLowerCase());
exports.userSchema = zod_1.z.object({
    id: schema_1.idSchema,
    name: zod_1.z.string().min(1).max(255),
    picture: zod_1.z.literal("").or(zod_1.z.null()).or(zod_1.z.string().url()),
    username: exports.usernameSchema,
    email: zod_1.z
        .string()
        .email()
        .transform((value) => value.toLowerCase()),
    locale: zod_1.z.string().default("en-US"),
    emailVerified: zod_1.z.boolean().default(false),
    twoFactorEnabled: zod_1.z.boolean().default(false),
    provider: zod_1.z.enum(["email", "github", "google", "openid"]).default("email"),
    createdAt: utils_1.dateSchema,
    updatedAt: utils_1.dateSchema,
});
class UserDto extends (0, dto_1.createZodDto)(exports.userSchema) {
}
exports.UserDto = UserDto;
exports.userWithSecretsSchema = exports.userSchema.merge(zod_1.z.object({ secrets: secrets_1.secretsSchema }));
class UserWithSecrets extends (0, dto_1.createZodDto)(exports.userWithSecretsSchema) {
}
exports.UserWithSecrets = UserWithSecrets;
