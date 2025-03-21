"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBasics = exports.basicsSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
// Schema
exports.basicsSchema = zod_1.z.object({
    name: zod_1.z.string(),
    headline: zod_1.z.string(),
    email: zod_1.z.string().default(""), // Allow empty strings
    phone: zod_1.z.string(),
    location: zod_1.z.string(),
    url: shared_1.urlSchema,
    customFields: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string().optional(), // Make `id` optional
        icon: zod_1.z.string().optional(), // Make `icon` optional
        name: zod_1.z.string().optional(), // Make `name` optional
        value: zod_1.z.string().optional(), // Make `value` optional
        href: zod_1.z.string().optional(), // Add `href` to match your data
        label: zod_1.z.string().optional(), // Add `label` to match your data
    }))
        .default([]), // Default to an empty array
    picture: zod_1.z.object({
        url: zod_1.z.string().default(""), // Allow empty strings
        size: zod_1.z.number().default(64),
        aspectRatio: zod_1.z.number().default(1),
        borderRadius: zod_1.z.number().default(0),
        effects: zod_1.z.object({
            hidden: zod_1.z.boolean().default(false),
            border: zod_1.z.boolean().default(false),
            grayscale: zod_1.z.boolean().default(false),
        }),
    }),
});
// Defaults
exports.defaultBasics = {
    name: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    url: shared_1.defaultUrl,
    customFields: [],
    picture: {
        url: "",
        size: 64,
        aspectRatio: 1,
        borderRadius: 0,
        effects: {
            hidden: false,
            border: false,
            grayscale: false,
        },
    },
};
// Schema
//export const basicsSchema = z.object({
//  name: z.string(),
//  headline: z.string(),
//  email: z.literal("").or(z.string().email()),
//  phone: z.string(),
//  location: z.string(),
//  url: urlSchema,
//  customFields: z.array(customFieldSchema),
//  picture: z.object({
//    url: z.string(),
//    size: z.number().default(64),
//    aspectRatio: z.number().default(1),
//    borderRadius: z.number().default(0),
//    effects: z.object({
//      hidden: z.boolean().default(false),
//      border: z.boolean().default(false),
//      grayscale: z.boolean().default(false),
//    }),
//  }),
//});
// Type
//export type Basics = z.infer<typeof basicsSchema>;
// Defaults
//export const defaultBasics: Basics = {
//  name: "",
//  headline: "",
//  email: "",
//  phone: "",
//  location: "",
//  url: defaultUrl,
//  customFields: [],
//  picture: {
//    url: "",
//    size: 64,
//    aspectRatio: 1,
//    borderRadius: 0,
//    effects: {
//      hidden: false,
//      border: false,
//      grayscale: false,
//    },
//  },
//};
__exportStar(require("./custom"), exports);
