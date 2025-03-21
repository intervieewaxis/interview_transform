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
exports.defaultResumeData = exports.resumeDataSchema = void 0;
const zod_1 = require("zod");
const basics_1 = require("./basics");
const metadata_1 = require("./metadata");
const sections_1 = require("./sections");
// Schema
exports.resumeDataSchema = zod_1.z.object({
    basics: basics_1.basicsSchema,
    sections: sections_1.sectionsSchema,
    metadata: metadata_1.metadataSchema,
});
// Defaults
exports.defaultResumeData = {
    basics: basics_1.defaultBasics,
    sections: sections_1.defaultSections,
    metadata: metadata_1.defaultMetadata,
};
__exportStar(require("./basics"), exports);
__exportStar(require("./metadata"), exports);
__exportStar(require("./sample"), exports);
__exportStar(require("./sections"), exports);
__exportStar(require("./shared"), exports);
