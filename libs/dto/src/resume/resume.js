"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeDto = exports.resumeSchema = void 0;
const schema_1 = require("@reactive-resume/schema");
const utils_1 = require("@reactive-resume/utils");
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
const user_1 = require("../user");
exports.resumeSchema = zod_1.z.object({
    id: schema_1.idSchema,
    title: zod_1.z.string(),
    slug: zod_1.z.string(),
    data: schema_1.resumeDataSchema.default(schema_1.defaultResumeData),
    visibility: zod_1.z.enum(["private", "public"]).default("private"),
    locked: zod_1.z.boolean().default(false),
    userId: schema_1.idSchema,
    user: user_1.userSchema.optional(),
    createdAt: utils_1.dateSchema,
    updatedAt: utils_1.dateSchema,
});
class ResumeDto extends (0, dto_1.createZodDto)(exports.resumeSchema) {
}
exports.ResumeDto = ResumeDto;
