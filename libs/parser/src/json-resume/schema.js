"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonResumeSchema = void 0;
const zod_1 = require("zod");
const urlSchema = zod_1.z.literal("").or(zod_1.z.string().url()).optional();
const iso8601 = zod_1.z
    .string()
    .regex(/^([12]\d{3}-[01]\d-[0-3]\d|[12]\d{3}-[01]\d|[12]\d{3})$/, "ISO8601 Date Format");
const locationSchema = zod_1.z.object({
    address: zod_1.z.string().optional(),
    postalCode: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    countryCode: zod_1.z.string().optional(),
    region: zod_1.z.string().optional(),
});
const profileSchema = zod_1.z.object({
    network: zod_1.z.string().optional(),
    username: zod_1.z.string().optional(),
    url: urlSchema,
});
const basicsSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    label: zod_1.z.string().optional(),
    image: zod_1.z.literal("").or(zod_1.z.string().url()).optional(),
    email: zod_1.z.literal("").or(zod_1.z.string().email()).optional(),
    phone: zod_1.z.string().optional(),
    url: urlSchema,
    summary: zod_1.z.string().optional(),
    location: locationSchema.optional(),
    profiles: zod_1.z.array(profileSchema).optional(),
});
const workSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    position: zod_1.z.string().optional(),
    url: urlSchema,
    startDate: iso8601.optional(),
    endDate: iso8601.optional(),
    summary: zod_1.z.string().optional(),
    highlights: zod_1.z.array(zod_1.z.string()).optional(),
});
const volunteerSchema = zod_1.z.object({
    organization: zod_1.z.string().optional(),
    position: zod_1.z.string().optional(),
    url: urlSchema,
    startDate: iso8601.optional(),
    endDate: iso8601.optional(),
    summary: zod_1.z.string().optional(),
    highlights: zod_1.z.array(zod_1.z.string()).optional(),
});
const awardsSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    date: iso8601.optional(),
    awarder: zod_1.z.string().optional(),
    summary: zod_1.z.string().optional(),
});
const certificatesSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    date: iso8601.optional(),
    issuer: zod_1.z.string().optional(),
    summary: zod_1.z.string().optional(),
});
const educationSchema = zod_1.z.object({
    institution: zod_1.z.string().optional(),
    url: urlSchema,
    area: zod_1.z.string().optional(),
    studyType: zod_1.z.string().optional(),
    startDate: iso8601.optional(),
    endDate: iso8601.optional(),
    score: zod_1.z.string().optional(),
    courses: zod_1.z.array(zod_1.z.string()).optional(),
});
const publicationsSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    publisher: zod_1.z.string().optional(),
    releaseDate: iso8601.optional(),
    url: urlSchema,
    summary: zod_1.z.string().optional(),
});
const skillsSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    level: zod_1.z.string().optional(),
    keywords: zod_1.z.array(zod_1.z.string()).optional(),
});
const languagesSchema = zod_1.z.object({
    language: zod_1.z.string().optional(),
    fluency: zod_1.z.string().optional(),
});
const interestsSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    keywords: zod_1.z.array(zod_1.z.string()).optional(),
});
const referencesSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    reference: zod_1.z.string().optional(),
});
exports.jsonResumeSchema = zod_1.z.object({
    basics: basicsSchema.optional(),
    work: zod_1.z.array(workSchema).optional(),
    volunteer: zod_1.z.array(volunteerSchema).optional(),
    education: zod_1.z.array(educationSchema).optional(),
    awards: zod_1.z.array(awardsSchema).optional(),
    certificates: zod_1.z.array(certificatesSchema).optional(),
    publications: zod_1.z.array(publicationsSchema).optional(),
    skills: zod_1.z.array(skillsSchema).optional(),
    languages: zod_1.z.array(languagesSchema).optional(),
    interests: zod_1.z.array(interestsSchema).optional(),
    references: zod_1.z.array(referencesSchema).optional(),
});
