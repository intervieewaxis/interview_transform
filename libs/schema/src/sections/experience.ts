//import { z } from "zod";

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
import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const experienceSchema = itemSchema.extend({
  company: z.string().default(""), // Allow empty strings
  position: z.string().default(""), // Allow empty strings
  location: z.string().default(""), // Allow empty strings
  date: z.string().default(""), // Allow empty strings
  summary: z.string().default(""), // Allow empty strings
  url: urlSchema.default({ href: "", label: "" }), // Provide a default value
});

// Type
export type Experience = z.infer<typeof experienceSchema>;

// Defaults
export const defaultExperience: Experience = {
  ...defaultItem,
  company: "",
  position: "",
  location: "",
  date: "",
  summary: "",
  url: defaultUrl,
};
