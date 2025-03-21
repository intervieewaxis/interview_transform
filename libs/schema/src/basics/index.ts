import { z } from "zod";

import { defaultUrl, urlSchema } from "../shared";
import { customFieldSchema } from "./custom";

// Schema
export const basicsSchema = z.object({
  name: z.string(),
  headline: z.string(),
  email: z.string().default(""), // Allow empty strings
  phone: z.string(),
  location: z.string(),
  url: urlSchema,
  customFields: z
    .array(
      z.object({
        id: z.string().optional(), // Make `id` optional
        icon: z.string().optional(), // Make `icon` optional
        name: z.string().optional(), // Make `name` optional
        value: z.string().optional(), // Make `value` optional
        href: z.string().optional(), // Add `href` to match your data
        label: z.string().optional(), // Add `label` to match your data
      })
    )
    .default([]), // Default to an empty array
  picture: z.object({
    url: z.string().default(""), // Allow empty strings
    size: z.number().default(64),
    aspectRatio: z.number().default(1),
    borderRadius: z.number().default(0),
    effects: z.object({
      hidden: z.boolean().default(false),
      border: z.boolean().default(false),
      grayscale: z.boolean().default(false),
    }),
  }),
});

// Type
export type Basics = z.infer<typeof basicsSchema>;

// Defaults
export const defaultBasics: Basics = {
  name: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  url: defaultUrl,
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

export * from "./custom";
