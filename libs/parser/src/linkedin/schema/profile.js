"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileSchema = void 0;
const zod_1 = require("zod");
exports.profileSchema = zod_1.z.object({
    "First Name": zod_1.z.string().default("John"),
    "Last Name": zod_1.z.string().default("Doe"),
    "Maiden Name": zod_1.z.string().optional(),
    Address: zod_1.z.string().default("123 Example Street, Somewhere, USA"),
    "Birth Date": zod_1.z.string().default("January 1st, 1970"),
    Headline: zod_1.z.string().default(""),
    Summary: zod_1.z.string().default(""),
    Industry: zod_1.z.string().default(""),
    "Zip Code": zod_1.z.string().optional(),
    "Geo Location": zod_1.z.string().default("Somewhere"),
    "Twitter Handles": zod_1.z.string().default("@test"),
    Websites: zod_1.z.string().default("https://www.example.com"),
    "Instant Messengers": zod_1.z.string().optional(),
});
