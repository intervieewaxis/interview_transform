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
exports.JsonResumeParser = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const schema_1 = require("@reactive-resume/schema");
const schema_2 = require("./schema");
__exportStar(require("./schema"), exports);
class JsonResumeParser {
    constructor() {
        this.schema = schema_2.jsonResumeSchema;
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33;
        const result = JSON.parse(JSON.stringify(schema_1.defaultResumeData));
        // Basics
        result.basics.name = (_b = (_a = data.basics) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
        result.basics.headline = (_d = (_c = data.basics) === null || _c === void 0 ? void 0 : _c.label) !== null && _d !== void 0 ? _d : "";
        result.basics.picture.url = (_f = (_e = data.basics) === null || _e === void 0 ? void 0 : _e.image) !== null && _f !== void 0 ? _f : "";
        result.basics.email = (_h = (_g = data.basics) === null || _g === void 0 ? void 0 : _g.email) !== null && _h !== void 0 ? _h : "";
        result.basics.phone = (_k = (_j = data.basics) === null || _j === void 0 ? void 0 : _j.phone) !== null && _k !== void 0 ? _k : "";
        result.basics.location = (_o = (_m = (_l = data.basics) === null || _l === void 0 ? void 0 : _l.location) === null || _m === void 0 ? void 0 : _m.address) !== null && _o !== void 0 ? _o : "";
        result.basics.url.href = (_q = (_p = data.basics) === null || _p === void 0 ? void 0 : _p.url) !== null && _q !== void 0 ? _q : "";
        result.sections.summary.content = (_s = (_r = data.basics) === null || _r === void 0 ? void 0 : _r.summary) !== null && _s !== void 0 ? _s : "";
        // Profiles
        if ((_t = data.basics) === null || _t === void 0 ? void 0 : _t.profiles) {
            for (const profile of data.basics.profiles) {
                result.sections.profiles.items.push(Object.assign(Object.assign({}, schema_1.defaultProfile), { id: (0, cuid2_1.createId)(), icon: (_v = (_u = profile.network) === null || _u === void 0 ? void 0 : _u.toLocaleLowerCase()) !== null && _v !== void 0 ? _v : "", network: (_w = profile.network) !== null && _w !== void 0 ? _w : "", username: (_x = profile.username) !== null && _x !== void 0 ? _x : "", url: Object.assign(Object.assign({}, schema_1.defaultProfile.url), { href: (_y = profile.url) !== null && _y !== void 0 ? _y : "" }) }));
            }
        }
        // Work
        if (data.work) {
            for (const work of data.work) {
                result.sections.experience.items.push(Object.assign(Object.assign({}, schema_1.defaultExperience), { id: (0, cuid2_1.createId)(), company: (_z = work.name) !== null && _z !== void 0 ? _z : "", position: (_0 = work.position) !== null && _0 !== void 0 ? _0 : "", summary: (_1 = work.summary) !== null && _1 !== void 0 ? _1 : "", date: `${work.startDate} - ${work.endDate}`, url: Object.assign(Object.assign({}, schema_1.defaultExperience.url), { href: (_2 = work.url) !== null && _2 !== void 0 ? _2 : "" }) }));
            }
        }
        // Volunteer
        if (data.volunteer) {
            for (const volunteer of data.volunteer) {
                result.sections.volunteer.items.push(Object.assign(Object.assign({}, schema_1.defaultVolunteer), { id: (0, cuid2_1.createId)(), organization: (_3 = volunteer.organization) !== null && _3 !== void 0 ? _3 : "", date: `${volunteer.startDate} - ${volunteer.endDate}`, position: (_4 = volunteer.position) !== null && _4 !== void 0 ? _4 : "", summary: (_5 = volunteer.summary) !== null && _5 !== void 0 ? _5 : "", url: Object.assign(Object.assign({}, schema_1.defaultVolunteer.url), { href: (_6 = volunteer.url) !== null && _6 !== void 0 ? _6 : "" }) }));
            }
        }
        // Education
        if (data.education) {
            for (const education of data.education) {
                result.sections.education.items.push(Object.assign(Object.assign({}, schema_1.defaultEducation), { id: (0, cuid2_1.createId)(), institution: (_7 = education.institution) !== null && _7 !== void 0 ? _7 : "", studyType: (_8 = education.studyType) !== null && _8 !== void 0 ? _8 : "", area: (_9 = education.area) !== null && _9 !== void 0 ? _9 : "", score: (_10 = education.score) !== null && _10 !== void 0 ? _10 : "", date: `${education.startDate} - ${education.endDate}`, url: Object.assign(Object.assign({}, schema_1.defaultEducation.url), { href: (_11 = education.url) !== null && _11 !== void 0 ? _11 : "" }) }));
            }
        }
        // Awards
        if (data.awards) {
            for (const award of data.awards) {
                result.sections.awards.items.push(Object.assign(Object.assign({}, schema_1.defaultAward), { id: (0, cuid2_1.createId)(), title: (_12 = award.title) !== null && _12 !== void 0 ? _12 : "", date: (_13 = award.date) !== null && _13 !== void 0 ? _13 : "", awarder: (_14 = award.awarder) !== null && _14 !== void 0 ? _14 : "", summary: (_15 = award.summary) !== null && _15 !== void 0 ? _15 : "" }));
            }
        }
        // Certificates
        if (data.certificates) {
            for (const certificate of data.certificates) {
                result.sections.certifications.items.push(Object.assign(Object.assign({}, schema_1.defaultCertification), { id: (0, cuid2_1.createId)(), name: (_16 = certificate.name) !== null && _16 !== void 0 ? _16 : "", date: (_17 = certificate.date) !== null && _17 !== void 0 ? _17 : "", issuer: (_18 = certificate.issuer) !== null && _18 !== void 0 ? _18 : "", summary: (_19 = certificate.summary) !== null && _19 !== void 0 ? _19 : "" }));
            }
        }
        // Publications
        if (data.publications) {
            for (const publication of data.publications) {
                result.sections.publications.items.push(Object.assign(Object.assign({}, schema_1.defaultPublication), { id: (0, cuid2_1.createId)(), name: (_20 = publication.name) !== null && _20 !== void 0 ? _20 : "", publisher: (_21 = publication.publisher) !== null && _21 !== void 0 ? _21 : "", summary: (_22 = publication.summary) !== null && _22 !== void 0 ? _22 : "", date: (_23 = publication.releaseDate) !== null && _23 !== void 0 ? _23 : "", url: Object.assign(Object.assign({}, schema_1.defaultPublication.url), { href: (_24 = publication.url) !== null && _24 !== void 0 ? _24 : "" }) }));
            }
        }
        // Skills
        if (data.skills) {
            for (const skill of data.skills) {
                result.sections.skills.items.push(Object.assign(Object.assign({}, schema_1.defaultSkill), { id: (0, cuid2_1.createId)(), name: (_25 = skill.name) !== null && _25 !== void 0 ? _25 : "", description: (_26 = skill.level) !== null && _26 !== void 0 ? _26 : "", keywords: (_27 = skill.keywords) !== null && _27 !== void 0 ? _27 : [] }));
            }
        }
        // Languages
        if (data.languages) {
            for (const language of data.languages) {
                result.sections.languages.items.push(Object.assign(Object.assign({}, schema_1.defaultLanguage), { id: (0, cuid2_1.createId)(), name: (_28 = language.language) !== null && _28 !== void 0 ? _28 : "", description: (_29 = language.fluency) !== null && _29 !== void 0 ? _29 : "" }));
            }
        }
        // Interests
        if (data.interests) {
            for (const interest of data.interests) {
                result.sections.interests.items.push(Object.assign(Object.assign({}, schema_1.defaultInterest), { id: (0, cuid2_1.createId)(), name: (_30 = interest.name) !== null && _30 !== void 0 ? _30 : "", keywords: (_31 = interest.keywords) !== null && _31 !== void 0 ? _31 : [] }));
            }
        }
        // References
        if (data.references) {
            for (const reference of data.references) {
                result.sections.references.items.push(Object.assign(Object.assign({}, schema_1.defaultReference), { id: (0, cuid2_1.createId)(), name: (_32 = reference.name) !== null && _32 !== void 0 ? _32 : "", summary: (_33 = reference.reference) !== null && _33 !== void 0 ? _33 : "" }));
            }
        }
        return result;
    }
}
exports.JsonResumeParser = JsonResumeParser;
