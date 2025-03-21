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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedInParser = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const schema_1 = require("@reactive-resume/schema");
const utils_1 = require("@reactive-resume/utils");
const JSZip = __importStar(require("jszip"));
const schema_2 = require("./schema");
__exportStar(require("./schema"), exports);
const avoidTooShort = (name, len) => {
    if (!name || name.length < len)
        return "Unknown";
    return name;
};
class LinkedInParser {
    constructor() {
        this.schema = schema_2.linkedInSchema;
    }
    readFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield JSZip.loadAsync(file);
            if (Object.keys(data.files).length === 0) {
                throw new Error("ParserError: There were no files found inside the zip archive.");
            }
            return data;
        });
    }
    validate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {};
            for (const [name, file] of Object.entries(data.files)) {
                for (const key of Object.keys(schema_2.linkedInSchema.shape)) {
                    if (name.includes(key)) {
                        const content = yield file.async("text");
                        result[key] = yield (0, utils_1.parseCSV)(content);
                    }
                }
            }
            return schema_2.linkedInSchema.parse(result);
        });
    }
    convert(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const result = JSON.parse(JSON.stringify(schema_1.defaultResumeData));
        // Profile
        if (data.Profile && data.Profile.length > 0) {
            const profile = data.Profile[0];
            const twitterHandle = profile["Twitter Handles"];
            result.basics.name = `${profile["First Name"]} ${profile["Last Name"]}`;
            result.basics.location = profile["Geo Location"];
            result.basics.headline = profile.Headline;
            // profile.Websites is represented as an array-like structure f.e. [COMPANY:https://some.link,PORTFOLIO:...]
            const extractFirstWebsiteLink = (entry) => { var _a; return ((_a = (0, utils_1.parseArrayLikeCSVEntry)(entry)[0]) !== null && _a !== void 0 ? _a : "").replace(/.*?:/, ""); };
            result.basics.url.href = (_a = (0, utils_1.extractUrl)(extractFirstWebsiteLink(profile.Websites))) !== null && _a !== void 0 ? _a : "";
            result.sections.summary.content = profile.Summary;
            if (twitterHandle) {
                result.sections.profiles.items.push(Object.assign(Object.assign({}, schema_1.defaultProfile), { id: (0, cuid2_1.createId)(), icon: "twitter", network: "Twitter", username: twitterHandle, url: Object.assign(Object.assign({}, schema_1.defaultProfile.url), { href: `https://twitter.com/${twitterHandle}` }) }));
            }
        }
        // Email Addresses
        if (data["Email Addresses"] && data["Email Addresses"].length > 0) {
            const email = data["Email Addresses"][0];
            result.basics.email = email["Email Address"];
        }
        // Positions
        if (data.Positions && data.Positions.length > 0) {
            for (const position of data.Positions) {
                result.sections.experience.items.push(Object.assign(Object.assign({}, schema_1.defaultExperience), { id: (0, cuid2_1.createId)(), company: position["Company Name"], position: position.Title, location: position.Location, summary: (_b = position.Description) !== null && _b !== void 0 ? _b : "", date: `${position["Started On"]} - ${(_c = position["Finished On"]) !== null && _c !== void 0 ? _c : "Present"}` }));
            }
        }
        // Education
        if (data.Education && data.Education.length > 0) {
            for (const education of data.Education) {
                result.sections.education.items.push(Object.assign(Object.assign({}, schema_1.defaultEducation), { id: (0, cuid2_1.createId)(), institution: avoidTooShort(education["School Name"], 2), studyType: avoidTooShort(education["Degree Name"], 2), summary: avoidTooShort((_d = education.Notes) !== null && _d !== void 0 ? _d : "", 2), date: `${education["Start Date"]} - ${(_e = education["End Date"]) !== null && _e !== void 0 ? _e : "Present"}` }));
            }
        }
        // Skills
        if (data.Skills && data.Skills.length > 0) {
            for (const skill of data.Skills) {
                result.sections.skills.items.push(Object.assign(Object.assign({}, schema_1.defaultSkill), { id: (0, cuid2_1.createId)(), name: skill.Name }));
            }
        }
        // Languages
        if (data.Languages && data.Languages.length > 0) {
            for (const language of data.Languages) {
                result.sections.languages.items.push(Object.assign(Object.assign({}, schema_1.defaultLanguage), { id: (0, cuid2_1.createId)(), name: language.Name, description: (_f = language.Proficiency) !== null && _f !== void 0 ? _f : "" }));
            }
        }
        // Certifications
        if (data.Certifications && data.Certifications.length > 0) {
            for (const certification of data.Certifications) {
                result.sections.certifications.items.push(Object.assign(Object.assign({}, schema_1.defaultCertification), { id: (0, cuid2_1.createId)(), name: certification.Name, issuer: certification.Authority, url: Object.assign(Object.assign({}, schema_1.defaultCertification.url), { href: certification.Url }), date: `${certification["Started On"]} - ${(_g = certification["Finished On"]) !== null && _g !== void 0 ? _g : "Present"}` }));
            }
        }
        // Projects
        if (data.Projects && data.Projects.length > 0) {
            for (const project of data.Projects) {
                result.sections.projects.items.push(Object.assign(Object.assign({}, schema_1.defaultProject), { id: (0, cuid2_1.createId)(), name: project.Title, description: project.Description, url: Object.assign(Object.assign({}, schema_1.defaultProject.url), { href: (_h = project.Url) !== null && _h !== void 0 ? _h : "" }), date: `${project["Started On"]} - ${(_j = project["Finished On"]) !== null && _j !== void 0 ? _j : "Present"}` }));
            }
        }
        return schema_1.resumeDataSchema.parse(result);
    }
}
exports.LinkedInParser = LinkedInParser;
