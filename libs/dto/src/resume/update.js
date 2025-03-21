"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResumeDto = exports.updateResumeSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const resume_1 = require("./resume");
exports.updateResumeSchema = resume_1.resumeSchema.partial();
class UpdateResumeDto extends (0, dto_1.createZodDto)(exports.updateResumeSchema) {
}
exports.UpdateResumeDto = UpdateResumeDto;
