"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributorDto = exports.contributorSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.contributorSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    url: zod_1.z.string(),
    avatar: zod_1.z.string(),
});
class ContributorDto extends (0, dto_1.createZodDto)(exports.contributorSchema) {
}
exports.ContributorDto = ContributorDto;
