"use strict";
//import { z } from "zod";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultExperience = exports.experienceSchema = void 0;
//import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
// Schema
//export const experienceSchema = itemSchema.extend({
//  company: z.string().min(1),
//  position: z.string(),
//  location: z.string(),
//  date: z.string(),
//  summary: z.string(),
//  url: urlSchema,
//});
//
// Type
//export type Experience = z.infer<typeof experienceSchema>;
// Defaults
//export const defaultExperience: Experience = {
//  ...defaultItem,
//  company: "",
//  position: "",
//  location: "",
//  date: "",
//  summary: "",
//  url: defaultUrl,
//};
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.experienceSchema = shared_1.itemSchema.extend({
    company: zod_1.z.string().default(""), // Allow empty strings
    position: zod_1.z.string().default(""), // Allow empty strings
    location: zod_1.z.string().default(""), // Allow empty strings
    date: zod_1.z.string().default(""), // Allow empty strings
    summary: zod_1.z.string().default(""), // Allow empty strings
    url: shared_1.urlSchema.default({ href: "", label: "" }), // Provide a default value
});
// Defaults
exports.defaultExperience = Object.assign(Object.assign({}, shared_1.defaultItem), { company: "", position: "", location: "", date: "", summary: "", url: shared_1.defaultUrl });
