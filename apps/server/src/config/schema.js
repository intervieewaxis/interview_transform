"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
const zod_1 = require("zod");
exports.configSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "production"]).default("production"),
    // Ports
    PORT: zod_1.z.coerce.number().default(3000),
    // URLs
    PUBLIC_URL: zod_1.z.string().url(),
    STORAGE_URL: zod_1.z.string().url(),
    // Database (Prisma)
    DATABASE_URL: zod_1.z.string().url().startsWith("postgresql://"),
    // Authentication Secrets
    ACCESS_TOKEN_SECRET: zod_1.z.string(),
    REFRESH_TOKEN_SECRET: zod_1.z.string(),
    // Browser
    CHROME_TOKEN: zod_1.z.string(),
    CHROME_URL: zod_1.z.string().url(),
    CHROME_IGNORE_HTTPS_ERRORS: zod_1.z
        .string()
        .default("false")
        .transform((s) => s !== "false" && s !== "0"),
    // Mail Server
    MAIL_FROM: zod_1.z.string().includes("@").optional().default("noreply@localhost"),
    SMTP_URL: zod_1.z
        .string()
        .url()
        .refine((url) => url.startsWith("smtp://") || url.startsWith("smtps://"))
        .optional(),
    // Storage
    STORAGE_ENDPOINT: zod_1.z.string(),
    STORAGE_PORT: zod_1.z.coerce.number(),
    STORAGE_REGION: zod_1.z.string().default("us-east-1"),
    STORAGE_BUCKET: zod_1.z.string(),
    STORAGE_ACCESS_KEY: zod_1.z.string(),
    STORAGE_SECRET_KEY: zod_1.z.string(),
    STORAGE_USE_SSL: zod_1.z
        .string()
        .default("false")
        .transform((s) => s !== "false" && s !== "0"),
    STORAGE_SKIP_BUCKET_CHECK: zod_1.z
        .string()
        .default("false")
        .transform((s) => s !== "false" && s !== "0"),
    // Crowdin (Optional)
    CROWDIN_PROJECT_ID: zod_1.z.coerce.number().optional(),
    CROWDIN_PERSONAL_TOKEN: zod_1.z.string().optional(),
    // Feature Flags (Optional)
    DISABLE_SIGNUPS: zod_1.z
        .string()
        .default("false")
        .transform((s) => s !== "false" && s !== "0"),
    DISABLE_EMAIL_AUTH: zod_1.z
        .string()
        .default("false")
        .transform((s) => s !== "false" && s !== "0"),
    // GitHub (OAuth, Optional)
    GITHUB_CLIENT_ID: zod_1.z.string().optional(),
    GITHUB_CLIENT_SECRET: zod_1.z.string().optional(),
    GITHUB_CALLBACK_URL: zod_1.z.string().url().optional(),
    // Google (OAuth, Optional)
    GOOGLE_CLIENT_ID: zod_1.z.string().optional(),
    GOOGLE_CLIENT_SECRET: zod_1.z.string().optional(),
    GOOGLE_CALLBACK_URL: zod_1.z.string().url().optional(),
    // OpenID (Optional)
    OPENID_AUTHORIZATION_URL: zod_1.z.string().url().optional(),
    OPENID_CALLBACK_URL: zod_1.z.string().url().optional(),
    OPENID_CLIENT_ID: zod_1.z.string().optional(),
    OPENID_CLIENT_SECRET: zod_1.z.string().optional(),
    OPENID_ISSUER: zod_1.z.string().optional(),
    OPENID_TOKEN_URL: zod_1.z.string().url().optional(),
    OPENID_USER_INFO_URL: zod_1.z.string().url().optional(),
});
