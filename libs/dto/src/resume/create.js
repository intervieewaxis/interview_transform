"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResumeDto = exports.createResumeSchema = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const slugify_1 = __importDefault(require("@sindresorhus/slugify"));
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.createResumeSchema = zod_1.z.object({
    // title: z.string().min(1),
    title: zod_1.z.string().min(1).optional().default("Untitled Resume"),
    slug: zod_1.z
        .string()
        .min(1)
        .transform((value) => {
        const slug = (0, slugify_1.default)(value);
        if (!slug)
            return (0, cuid2_1.createId)();
        return slug;
    })
        .optional(),
    visibility: zod_1.z.enum(["public", "private"]).default("private"),
    data: zod_1.z.any(),
});
class CreateResumeDto extends (0, dto_1.createZodDto)(exports.createResumeSchema) {
}
exports.CreateResumeDto = CreateResumeDto;
