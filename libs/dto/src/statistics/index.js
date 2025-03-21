"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsDto = exports.statisticsSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.statisticsSchema = zod_1.z.object({
    views: zod_1.z.number().int().default(0),
    downloads: zod_1.z.number().int().default(0),
});
class StatisticsDto extends (0, dto_1.createZodDto)(exports.statisticsSchema) {
}
exports.StatisticsDto = StatisticsDto;
