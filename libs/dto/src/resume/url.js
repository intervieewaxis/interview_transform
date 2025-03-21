"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlDto = exports.urlSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.urlSchema = zod_1.z.object({ url: zod_1.z.string().url() });
class UrlDto extends (0, dto_1.createZodDto)(exports.urlSchema) {
}
exports.UrlDto = UrlDto;
