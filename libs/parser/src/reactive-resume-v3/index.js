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
exports.ReactiveResumeV3Parser = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const cuid2_1 = require("@paralleldrive/cuid2");
const schema_1 = require("@reactive-resume/schema");
const utils_1 = require("@reactive-resume/utils");
const schema_2 = require("./schema");
__exportStar(require("./schema"), exports);
class ReactiveResumeV3Parser {
    constructor() {
        this.schema = schema_2.reactiveResumeV3Schema;
    }
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            // eslint-disable-next-line unicorn/prefer-add-event-listener
            reader.onload = () => {
                try {
                    const result = JSON.parse(reader.result);
                    resolve(result);
                }
                catch (_a) {
                    reject(new Error("Failed to parse JSON"));
                }
            };
            // eslint-disable-next-line unicorn/prefer-add-event-listener
            reader.onerror = () => {
                reject(new Error("Failed to read the file"));
            };
            // eslint-disable-next-line unicorn/prefer-blob-reading-methods
            reader.readAsText(file);
        });
    }
    validate(data) {
        return this.schema.parse(data);
    }
    convert(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36;
        const result = JSON.parse(JSON.stringify(schema_1.defaultResumeData));
        // Basics
        result.basics.name = (_a = data.basics.name) !== null && _a !== void 0 ? _a : "";
        result.basics.email = data.basics.email;
        result.basics.phone = (_b = data.basics.phone) !== null && _b !== void 0 ? _b : "";
        result.basics.headline = (_c = data.basics.headline) !== null && _c !== void 0 ? _c : "";
        result.basics.location = (_d = data.basics.location.address) !== null && _d !== void 0 ? _d : "";
        result.sections.summary.content =
            (_f = (typeof data.basics.summary === "string" ? data.basics.summary : (_e = data.basics.summary) === null || _e === void 0 ? void 0 : _e.body)) !== null && _f !== void 0 ? _f : "";
        result.basics.picture.url = (0, utils_1.isUrl)(data.basics.photo.url) ? data.basics.photo.url : "";
        // Profiles
        if (data.basics.profiles && data.basics.profiles.length > 0) {
            for (const profile of data.basics.profiles) {
                result.sections.profiles.items.push(Object.assign(Object.assign({}, schema_1.defaultProfile), { id: (0, cuid2_1.createId)(), network: (_g = profile.network) !== null && _g !== void 0 ? _g : "", username: (_h = profile.username) !== null && _h !== void 0 ? _h : "", icon: ((_j = profile.network) !== null && _j !== void 0 ? _j : "").toLocaleLowerCase(), url: Object.assign(Object.assign({}, schema_1.defaultProfile.url), { href: (0, utils_1.isUrl)(profile.url) ? profile.url : "" }) }));
            }
        }
        // Work
        if (((_k = data.sections.work) === null || _k === void 0 ? void 0 : _k.items) && data.sections.work.items.length > 0) {
            for (const work of data.sections.work.items) {
                if (!work)
                    continue;
                result.sections.experience.items.push(Object.assign(Object.assign({}, schema_1.defaultExperience), { id: (0, cuid2_1.createId)(), company: (_l = work.name) !== null && _l !== void 0 ? _l : "", position: (_m = work.position) !== null && _m !== void 0 ? _m : "", summary: (_o = work.summary) !== null && _o !== void 0 ? _o : "", date: `${(_p = work.date) === null || _p === void 0 ? void 0 : _p.start} - ${(_q = work.date) === null || _q === void 0 ? void 0 : _q.end}`, url: Object.assign(Object.assign({}, schema_1.defaultExperience.url), { href: (0, utils_1.isUrl)(work.url) ? work.url : "" }) }));
            }
        }
        // Awards
        if (((_r = data.sections.awards) === null || _r === void 0 ? void 0 : _r.items) && data.sections.awards.items.length > 0) {
            for (const award of data.sections.awards.items) {
                if (!award)
                    continue;
                result.sections.awards.items.push(Object.assign(Object.assign({}, schema_1.defaultAward), { id: (0, cuid2_1.createId)(), title: (_s = award.title) !== null && _s !== void 0 ? _s : "", awarder: (_t = award.awarder) !== null && _t !== void 0 ? _t : "", date: (_u = award.date) !== null && _u !== void 0 ? _u : "", summary: (_v = award.summary) !== null && _v !== void 0 ? _v : "", url: Object.assign(Object.assign({}, schema_1.defaultAward.url), { href: (0, utils_1.isUrl)(award.url) ? award.url : "" }) }));
            }
        }
        // Skills
        if (((_w = data.sections.skills) === null || _w === void 0 ? void 0 : _w.items) && data.sections.skills.items.length > 0) {
            for (const skill of data.sections.skills.items) {
                if (!skill)
                    continue;
                result.sections.skills.items.push(Object.assign(Object.assign({}, schema_1.defaultSkill), { id: (0, cuid2_1.createId)(), name: (_x = skill.name) !== null && _x !== void 0 ? _x : "", level: Math.floor(skill.levelNum / 2), description: (_y = skill.level) !== null && _y !== void 0 ? _y : "", keywords: Array.isArray(skill.keywords)
                        ? skill.keywords.filter(Boolean)
                        : [] }));
            }
        }
        // Projects
        if (((_z = data.sections.projects) === null || _z === void 0 ? void 0 : _z.items) && data.sections.projects.items.length > 0) {
            for (const project of data.sections.projects.items) {
                if (!project)
                    continue;
                result.sections.projects.items.push(Object.assign(Object.assign({}, schema_1.defaultProject), { id: (0, cuid2_1.createId)(), name: (_0 = project.name) !== null && _0 !== void 0 ? _0 : "", summary: (_1 = project.summary) !== null && _1 !== void 0 ? _1 : "", description: (_2 = project.description) !== null && _2 !== void 0 ? _2 : "", date: `${(_3 = project.date) === null || _3 === void 0 ? void 0 : _3.start} - ${(_4 = project.date) === null || _4 === void 0 ? void 0 : _4.end}`, keywords: Array.isArray(project.keywords)
                        ? project.keywords.filter(Boolean)
                        : [], url: Object.assign(Object.assign({}, schema_1.defaultProject.url), { href: (0, utils_1.isUrl)(project.url) ? project.url : "" }) }));
            }
        }
        // Education
        if (((_5 = data.sections.education) === null || _5 === void 0 ? void 0 : _5.items) && data.sections.education.items.length > 0) {
            for (const education of data.sections.education.items) {
                if (!education)
                    continue;
                result.sections.education.items.push(Object.assign(Object.assign({}, schema_1.defaultEducation), { id: (0, cuid2_1.createId)(), institution: (_6 = education.institution) !== null && _6 !== void 0 ? _6 : "", studyType: (_7 = education.degree) !== null && _7 !== void 0 ? _7 : "", area: (_8 = education.area) !== null && _8 !== void 0 ? _8 : "", score: (_9 = education.score) !== null && _9 !== void 0 ? _9 : "", summary: (_10 = education.summary) !== null && _10 !== void 0 ? _10 : "", date: `${(_11 = education.date) === null || _11 === void 0 ? void 0 : _11.start} - ${(_12 = education.date) === null || _12 === void 0 ? void 0 : _12.end}`, url: Object.assign(Object.assign({}, schema_1.defaultEducation.url), { href: (0, utils_1.isUrl)(education.url) ? education.url : "" }) }));
            }
        }
        // Interests
        if (((_13 = data.sections.interests) === null || _13 === void 0 ? void 0 : _13.items) && data.sections.interests.items.length > 0) {
            for (const interest of data.sections.interests.items) {
                if (!interest)
                    continue;
                result.sections.interests.items.push(Object.assign(Object.assign({}, schema_1.defaultInterest), { id: (0, cuid2_1.createId)(), name: (_14 = interest.name) !== null && _14 !== void 0 ? _14 : "", keywords: Array.isArray(interest.keywords)
                        ? interest.keywords.filter(Boolean)
                        : [] }));
            }
        }
        // Languages
        if (((_15 = data.sections.languages) === null || _15 === void 0 ? void 0 : _15.items) && data.sections.languages.items.length > 0) {
            for (const language of data.sections.languages.items) {
                if (!language)
                    continue;
                result.sections.languages.items.push(Object.assign(Object.assign({}, schema_1.defaultLanguage), { id: (0, cuid2_1.createId)(), name: (_16 = language.name) !== null && _16 !== void 0 ? _16 : "", description: (_17 = language.level) !== null && _17 !== void 0 ? _17 : "", level: Math.floor(language.levelNum / 2) }));
            }
        }
        // Volunteer
        if (((_18 = data.sections.volunteer) === null || _18 === void 0 ? void 0 : _18.items) && data.sections.volunteer.items.length > 0) {
            for (const volunteer of data.sections.volunteer.items) {
                if (!volunteer)
                    continue;
                result.sections.volunteer.items.push(Object.assign(Object.assign({}, schema_1.defaultVolunteer), { id: (0, cuid2_1.createId)(), organization: (_19 = volunteer.organization) !== null && _19 !== void 0 ? _19 : "", position: (_20 = volunteer.position) !== null && _20 !== void 0 ? _20 : "", summary: (_21 = volunteer.summary) !== null && _21 !== void 0 ? _21 : "", date: `${(_22 = volunteer.date) === null || _22 === void 0 ? void 0 : _22.start} - ${(_23 = volunteer.date) === null || _23 === void 0 ? void 0 : _23.end}`, url: Object.assign(Object.assign({}, schema_1.defaultVolunteer.url), { href: (0, utils_1.isUrl)(volunteer.url) ? volunteer.url : "" }) }));
            }
        }
        // References
        if (((_24 = data.sections.references) === null || _24 === void 0 ? void 0 : _24.items) && data.sections.references.items.length > 0) {
            for (const reference of data.sections.references.items) {
                if (!reference)
                    continue;
                result.sections.references.items.push(Object.assign(Object.assign({}, schema_1.defaultReference), { id: (0, cuid2_1.createId)(), name: (_25 = reference.name) !== null && _25 !== void 0 ? _25 : "", summary: (_26 = reference.summary) !== null && _26 !== void 0 ? _26 : "", description: (_27 = reference.relationship) !== null && _27 !== void 0 ? _27 : "" }));
            }
        }
        // Publications
        if (((_28 = data.sections.publications) === null || _28 === void 0 ? void 0 : _28.items) && data.sections.publications.items.length > 0) {
            for (const publication of data.sections.publications.items) {
                if (!publication)
                    continue;
                result.sections.publications.items.push(Object.assign(Object.assign({}, schema_1.defaultPublication), { id: (0, cuid2_1.createId)(), name: (_29 = publication.name) !== null && _29 !== void 0 ? _29 : "", summary: (_30 = publication.summary) !== null && _30 !== void 0 ? _30 : "", date: (_31 = publication.date) !== null && _31 !== void 0 ? _31 : "", url: Object.assign(Object.assign({}, schema_1.defaultPublication.url), { href: (0, utils_1.isUrl)(publication.url) ? publication.url : "" }) }));
            }
        }
        // Certifications
        if (((_32 = data.sections.certifications) === null || _32 === void 0 ? void 0 : _32.items) && data.sections.certifications.items.length > 0) {
            for (const certification of data.sections.certifications.items) {
                if (!certification)
                    continue;
                result.sections.certifications.items.push(Object.assign(Object.assign({}, schema_1.defaultCertification), { id: (0, cuid2_1.createId)(), name: (_33 = certification.name) !== null && _33 !== void 0 ? _33 : "", issuer: (_34 = certification.issuer) !== null && _34 !== void 0 ? _34 : "", summary: (_35 = certification.summary) !== null && _35 !== void 0 ? _35 : "", date: (_36 = certification.date) !== null && _36 !== void 0 ? _36 : "", url: Object.assign(Object.assign({}, schema_1.defaultCertification.url), { href: (0, utils_1.isUrl)(certification.url) ? certification.url : "" }) }));
            }
        }
        return result;
    }
}
exports.ReactiveResumeV3Parser = ReactiveResumeV3Parser;
