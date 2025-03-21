"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDto = exports.messageSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.messageSchema = zod_1.z.object({ message: zod_1.z.string() });
class MessageDto extends (0, dto_1.createZodDto)(exports.messageSchema) {
}
exports.MessageDto = MessageDto;
