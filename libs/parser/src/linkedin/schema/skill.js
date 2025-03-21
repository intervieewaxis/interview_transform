"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillSchema = void 0;
const zod_1 = require("zod");
exports.skillSchema = zod_1.z.object({
    Name: zod_1.z.string(),
});
