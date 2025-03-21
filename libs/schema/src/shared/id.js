"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const zod_1 = require("zod");
exports.idSchema = zod_1.z
    .string()
    .cuid2()
    .default((0, cuid2_1.createId)())
    .describe("Unique identifier for the item in Cuid2 format");
