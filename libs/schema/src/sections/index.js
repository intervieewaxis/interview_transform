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
exports.defaultSections = exports.defaultSection = exports.sectionsSchema = exports.customSchema = exports.sectionSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("../shared");
const award_1 = require("./award");
const certification_1 = require("./certification");
const custom_section_1 = require("./custom-section");
const education_1 = require("./education");
const experience_1 = require("./experience");
const interest_1 = require("./interest");
const language_1 = require("./language");
const profile_1 = require("./profile");
const project_1 = require("./project");
const publication_1 = require("./publication");
const reference_1 = require("./reference");
const skill_1 = require("./skill");
const volunteer_1 = require("./volunteer");
// Schema
exports.sectionSchema = zod_1.z.object({
    name: zod_1.z.string(),
    columns: zod_1.z.number().min(1).max(5).default(1),
    separateLinks: zod_1.z.boolean().default(true),
    visible: zod_1.z.boolean().default(true),
});
// Schema
exports.customSchema = exports.sectionSchema.extend({
    id: shared_1.idSchema,
    items: zod_1.z.array(custom_section_1.customSectionSchema),
});
exports.sectionsSchema = zod_1.z.object({
    summary: exports.sectionSchema.extend({
        id: zod_1.z.literal("summary"),
        content: zod_1.z.string().default(""),
    }),
    awards: exports.sectionSchema.extend({
        id: zod_1.z.literal("awards"),
        items: zod_1.z.array(award_1.awardSchema),
    }),
    certifications: exports.sectionSchema.extend({
        id: zod_1.z.literal("certifications"),
        items: zod_1.z.array(certification_1.certificationSchema),
    }),
    education: exports.sectionSchema.extend({
        id: zod_1.z.literal("education"),
        items: zod_1.z.array(education_1.educationSchema),
    }),
    experience: exports.sectionSchema.extend({
        id: zod_1.z.literal("experience"),
        items: zod_1.z.array(experience_1.experienceSchema),
    }),
    volunteer: exports.sectionSchema.extend({
        id: zod_1.z.literal("volunteer"),
        items: zod_1.z.array(volunteer_1.volunteerSchema),
    }),
    interests: exports.sectionSchema.extend({
        id: zod_1.z.literal("interests"),
        items: zod_1.z.array(interest_1.interestSchema),
    }),
    languages: exports.sectionSchema.extend({
        id: zod_1.z.literal("languages"),
        items: zod_1.z.array(language_1.languageSchema),
    }),
    profiles: exports.sectionSchema.extend({
        id: zod_1.z.literal("profiles"),
        items: zod_1.z.array(profile_1.profileSchema),
    }),
    projects: exports.sectionSchema.extend({
        id: zod_1.z.literal("projects"),
        items: zod_1.z.array(project_1.projectSchema),
    }),
    publications: exports.sectionSchema.extend({
        id: zod_1.z.literal("publications"),
        items: zod_1.z.array(publication_1.publicationSchema),
    }),
    references: exports.sectionSchema.extend({
        id: zod_1.z.literal("references"),
        items: zod_1.z.array(reference_1.referenceSchema),
    }),
    skills: exports.sectionSchema.extend({
        id: zod_1.z.literal("skills"),
        items: zod_1.z.array(skill_1.skillSchema),
    }),
    custom: zod_1.z.record(zod_1.z.string(), exports.customSchema),
});
// Defaults
exports.defaultSection = {
    name: "",
    columns: 1,
    separateLinks: true,
    visible: true,
};
exports.defaultSections = {
    summary: Object.assign(Object.assign({}, exports.defaultSection), { id: "summary", name: "Summary", content: "" }),
    awards: Object.assign(Object.assign({}, exports.defaultSection), { id: "awards", name: "Awards", items: [] }),
    certifications: Object.assign(Object.assign({}, exports.defaultSection), { id: "certifications", name: "Certifications", items: [] }),
    education: Object.assign(Object.assign({}, exports.defaultSection), { id: "education", name: "Education", items: [] }),
    experience: Object.assign(Object.assign({}, exports.defaultSection), { id: "experience", name: "Experience", items: [] }),
    volunteer: Object.assign(Object.assign({}, exports.defaultSection), { id: "volunteer", name: "Volunteering", items: [] }),
    interests: Object.assign(Object.assign({}, exports.defaultSection), { id: "interests", name: "Interests", items: [] }),
    languages: Object.assign(Object.assign({}, exports.defaultSection), { id: "languages", name: "Languages", items: [] }),
    profiles: Object.assign(Object.assign({}, exports.defaultSection), { id: "profiles", name: "Profiles", items: [] }),
    projects: Object.assign(Object.assign({}, exports.defaultSection), { id: "projects", name: "Projects", items: [] }),
    publications: Object.assign(Object.assign({}, exports.defaultSection), { id: "publications", name: "Publications", items: [] }),
    references: Object.assign(Object.assign({}, exports.defaultSection), { id: "references", name: "References", items: [] }),
    skills: Object.assign(Object.assign({}, exports.defaultSection), { id: "skills", name: "Skills", items: [] }),
    custom: {},
};
__exportStar(require("./award"), exports);
__exportStar(require("./certification"), exports);
__exportStar(require("./custom-section"), exports);
__exportStar(require("./education"), exports);
__exportStar(require("./experience"), exports);
__exportStar(require("./interest"), exports);
__exportStar(require("./language"), exports);
__exportStar(require("./profile"), exports);
__exportStar(require("./project"), exports);
__exportStar(require("./publication"), exports);
__exportStar(require("./reference"), exports);
__exportStar(require("./skill"), exports);
__exportStar(require("./volunteer"), exports);
