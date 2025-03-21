"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkedInSchema = void 0;
const zod_1 = require("zod");
const certification_1 = require("./certification");
const education_1 = require("./education");
const email_1 = require("./email");
const language_1 = require("./language");
const position_1 = require("./position");
const profile_1 = require("./profile");
const project_1 = require("./project");
const skill_1 = require("./skill");
exports.linkedInSchema = zod_1.z.object({
    Profile: zod_1.z.array(profile_1.profileSchema).optional(),
    "Email Addresses": zod_1.z.array(email_1.emailSchema).optional(),
    Certifications: zod_1.z.array(certification_1.certificationSchema).optional(),
    Education: zod_1.z.array(education_1.educationSchema).optional(),
    Languages: zod_1.z.array(language_1.languageSchema).optional(),
    Positions: zod_1.z.array(position_1.positionSchema).optional(),
    Projects: zod_1.z.array(project_1.projectSchema).optional(),
    Skills: zod_1.z.array(skill_1.skillSchema).optional(),
});
