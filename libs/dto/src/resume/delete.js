"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteResumeDto = exports.deleteResumeSchema = void 0;
const schema_1 = require("@reactive-resume/schema");
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.deleteResumeSchema = zod_1.z.object({
    id: schema_1.idSchema,
});
class DeleteResumeDto extends (0, dto_1.createZodDto)(exports.deleteResumeSchema) {
}
exports.DeleteResumeDto = DeleteResumeDto;
