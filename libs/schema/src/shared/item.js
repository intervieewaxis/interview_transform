"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultItem = exports.itemSchema = void 0;
const zod_1 = require("zod");
const id_1 = require("./id");
// Schema
exports.itemSchema = zod_1.z.object({
    id: id_1.idSchema,
    visible: zod_1.z.boolean(),
});
// Defaults
exports.defaultItem = {
    id: "",
    visible: true,
};
