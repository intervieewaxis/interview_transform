import { z } from "zod";

export const customFieldSchema = z.object({
  id: z.string().cuid2(), // `id` is required
  icon: z.string().default(""), // Make `icon` optional
  name: z.string().default(""), // Make `name` optional
  value: z.string().default(""), // Make `value` optional
  label: z.string().default(""), // Add `label` to match your data
  href: z.string().default(""), // Add `href` to match your data
});

export type CustomField = z.infer<typeof customFieldSchema>;
