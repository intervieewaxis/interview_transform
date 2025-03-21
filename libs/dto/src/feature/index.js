"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureDto = exports.featureSchema = void 0;
const dto_1 = require("nestjs-zod/dto");
const zod_1 = require("zod");
exports.featureSchema = zod_1.z.object({
    isSignupsDisabled: zod_1.z.boolean().default(false),
    isEmailAuthDisabled: zod_1.z.boolean().default(false),
});
class FeatureDto extends (0, dto_1.createZodDto)(exports.featureSchema) {
}
exports.FeatureDto = FeatureDto;
