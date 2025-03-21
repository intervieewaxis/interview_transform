"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactiveResumeV3Schema = void 0;
const zod_1 = require("zod");
const dateSchema = zod_1.z
    .object({ start: zod_1.z.string().optional(), end: zod_1.z.string().optional() })
    .optional();
const profileSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    network: zod_1.z.string().optional(),
    username: zod_1.z.string().optional(),
});
const basicsSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.literal("").or(zod_1.z.string().email()),
    phone: zod_1.z.string().optional(),
    headline: zod_1.z.string().optional(),
    summary: zod_1.z
        .string()
        .or(zod_1.z.object({
        body: zod_1.z.string().optional(),
        visible: zod_1.z.boolean().default(true),
        heading: zod_1.z.string().optional(),
    }))
        .optional(),
    birthdate: zod_1.z.string().optional(),
    website: zod_1.z.string().optional(),
    profiles: zod_1.z.array(profileSchema).optional(),
    location: zod_1.z.object({
        address: zod_1.z.string().optional(),
        postalCode: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        region: zod_1.z.string().optional(),
    }),
    photo: zod_1.z.object({
        visible: zod_1.z.boolean(),
        url: zod_1.z.string().optional(),
        filters: zod_1.z.object({
            shape: zod_1.z.string().nullable().optional(),
            size: zod_1.z.coerce.number(),
            border: zod_1.z.boolean(),
            grayscale: zod_1.z.boolean(),
        }),
    }),
});
const sectionSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    type: zod_1.z.enum(["basic", "work", "custom"]),
    columns: zod_1.z.coerce.number().or(zod_1.z.null()).default(1),
    visible: zod_1.z.boolean(),
});
const workSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    date: dateSchema,
    name: zod_1.z.string().optional(),
    position: zod_1.z.string().optional(),
    summary: zod_1.z.string().nullable().optional(),
})
    .nullable();
const awardSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    awarder: zod_1.z.string().optional(),
    summary: zod_1.z.string().nullable().optional(),
})
    .nullable();
const skillSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    level: zod_1.z.coerce.string().optional(),
    keywords: zod_1.z.array(zod_1.z.string().nullable()).optional(),
    levelNum: zod_1.z.coerce.number(),
})
    .nullable();
const projectSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    date: dateSchema,
    name: zod_1.z.string().optional(),
    summary: zod_1.z.string().nullable().optional(),
    keywords: zod_1.z.array(zod_1.z.string().nullable()).optional(),
    description: zod_1.z.string().optional(),
})
    .nullable();
const educationSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    area: zod_1.z.string().optional(),
    date: dateSchema,
    score: zod_1.z.string().optional(),
    degree: zod_1.z.string().optional(),
    courses: zod_1.z.array(zod_1.z.string().nullable()).optional(),
    summary: zod_1.z.string().nullable().optional(),
    institution: zod_1.z.string().optional(),
})
    .nullable();
const interestSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    keywords: zod_1.z.array(zod_1.z.string().nullable()).optional(),
})
    .nullable();
const languageSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    level: zod_1.z.string().optional(),
    levelNum: zod_1.z.coerce.number(),
})
    .nullable();
const volunteerSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    organization: zod_1.z.string().optional(),
    position: zod_1.z.string().optional(),
    date: dateSchema,
    url: zod_1.z.string().optional(),
    summary: zod_1.z.string().nullable().optional(),
})
    .nullable();
const referenceSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    summary: zod_1.z.string().nullable().optional(),
    relationship: zod_1.z.string().optional(),
})
    .nullable();
const publicationSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    publisher: zod_1.z.string().optional(),
    summary: zod_1.z.string().nullable().optional(),
})
    .nullable();
const certificationSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    issuer: zod_1.z.string().optional(),
    summary: zod_1.z.string().nullable().optional(),
})
    .nullable();
const metadataSchema = zod_1.z
    .object({
    css: zod_1.z.object({ value: zod_1.z.string().optional(), visible: zod_1.z.boolean() }).optional(),
    date: zod_1.z.object({ format: zod_1.z.string().optional() }).optional(),
    theme: zod_1.z
        .object({
        text: zod_1.z.string().optional(),
        primary: zod_1.z.string().optional(),
        background: zod_1.z.string().optional(),
    })
        .optional(),
    layout: zod_1.z.array(zod_1.z.array(zod_1.z.array(zod_1.z.string().nullable()))).optional(),
    locale: zod_1.z.string().optional(),
    template: zod_1.z.string().optional(),
    typography: zod_1.z
        .object({
        size: zod_1.z
            .object({ body: zod_1.z.coerce.number().optional(), heading: zod_1.z.coerce.number().optional() })
            .optional(),
        family: zod_1.z
            .object({ body: zod_1.z.string().optional(), heading: zod_1.z.string().optional() })
            .optional(),
    })
        .optional(),
})
    .optional();
exports.reactiveResumeV3Schema = zod_1.z.object({
    public: zod_1.z.boolean(),
    basics: basicsSchema,
    sections: zod_1.z.object({
        work: sectionSchema.extend({ items: zod_1.z.array(workSchema) }).optional(),
        awards: sectionSchema.extend({ items: zod_1.z.array(awardSchema) }).optional(),
        skills: sectionSchema.extend({ items: zod_1.z.array(skillSchema) }).optional(),
        projects: sectionSchema.extend({ items: zod_1.z.array(projectSchema) }).optional(),
        education: sectionSchema.extend({ items: zod_1.z.array(educationSchema) }).optional(),
        interests: sectionSchema.extend({ items: zod_1.z.array(interestSchema) }).optional(),
        languages: sectionSchema.extend({ items: zod_1.z.array(languageSchema) }).optional(),
        volunteer: sectionSchema.extend({ items: zod_1.z.array(volunteerSchema) }).optional(),
        references: sectionSchema.extend({ items: zod_1.z.array(referenceSchema) }).optional(),
        publications: sectionSchema.extend({ items: zod_1.z.array(publicationSchema) }).optional(),
        certifications: sectionSchema
            .extend({
            items: zod_1.z.array(certificationSchema),
        })
            .optional(),
    }),
    metadata: metadataSchema,
});
