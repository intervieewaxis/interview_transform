"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMetadata = exports.metadataSchema = exports.defaultLayout = void 0;
const zod_1 = require("zod");
exports.defaultLayout = [
    [
        ["profiles", "summary", "experience", "education", "projects", "volunteer", "references"],
        ["skills", "interests", "certifications", "awards", "publications", "languages"],
    ],
];
// Schema
exports.metadataSchema = zod_1.z.object({
    template: zod_1.z.string().default("rhyhorn"),
    layout: zod_1.z.array(zod_1.z.array(zod_1.z.array(zod_1.z.string()))).default(exports.defaultLayout), // pages -> columns -> sections
    css: zod_1.z.object({
        value: zod_1.z.string().default("* {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}"),
        visible: zod_1.z.boolean().default(false),
    }),
    page: zod_1.z.object({
        margin: zod_1.z.number().default(18),
        format: zod_1.z.enum(["a4", "letter"]).default("a4"),
        options: zod_1.z.object({
            breakLine: zod_1.z.boolean().default(true),
            pageNumbers: zod_1.z.boolean().default(true),
        }),
    }),
    theme: zod_1.z.object({
        background: zod_1.z.string().default("#ffffff"),
        text: zod_1.z.string().default("#000000"),
        primary: zod_1.z.string().default("#dc2626"),
    }),
    typography: zod_1.z.object({
        font: zod_1.z.object({
            family: zod_1.z.string().default("IBM Plex Serif"),
            subset: zod_1.z.string().default("latin"),
            variants: zod_1.z.array(zod_1.z.string()).default(["regular"]),
            size: zod_1.z.number().default(14),
        }),
        lineHeight: zod_1.z.number().default(1.5),
        hideIcons: zod_1.z.boolean().default(false),
        underlineLinks: zod_1.z.boolean().default(true),
    }),
    notes: zod_1.z.string().default(""),
});
// Defaults
exports.defaultMetadata = {
    template: "rhyhorn",
    layout: exports.defaultLayout,
    css: {
        value: "* {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
        visible: false,
    },
    page: {
        margin: 18,
        format: "a4",
        options: {
            breakLine: true,
            pageNumbers: true,
        },
    },
    theme: {
        background: "#ffffff",
        text: "#000000",
        primary: "#dc2626",
    },
    typography: {
        font: {
            family: "IBM Plex Serif",
            subset: "latin",
            variants: ["regular", "italic", "600"],
            size: 14,
        },
        lineHeight: 1.5,
        hideIcons: false,
        underlineLinks: true,
    },
    notes: "",
};
