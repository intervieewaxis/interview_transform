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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leafish = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@reactive-resume/utils");
const lodash_get_1 = __importDefault(require("lodash.get"));
const react_1 = __importStar(require("react"));
const brand_icon_1 = require("../components/brand-icon");
const picture_1 = require("../components/picture");
const artboard_1 = require("../store/artboard");
const Header = () => {
    const basics = (0, artboard_1.useArtboardStore)((state) => state.resume.basics);
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.summary);
    const profiles = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.profiles);
    const primaryColor = (0, artboard_1.useArtboardStore)((state) => state.resume.metadata.theme.primary);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-custom flex items-center space-x-8", style: { backgroundColor: (0, utils_1.hexToRgb)(primaryColor, 0.2) }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-3xl font-bold", children: basics.name }), (0, jsx_runtime_1.jsx)("div", { className: "text-base font-medium text-primary", children: basics.headline })] }), (0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: { __html: section.content }, className: "wysiwyg", style: { columns: section.columns } })] }), (0, jsx_runtime_1.jsx)(picture_1.Picture, {})] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-custom space-y-3", style: { backgroundColor: (0, utils_1.hexToRgb)(primaryColor, 0.4) }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm", children: [basics.location && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-x-1.5", children: [(0, jsx_runtime_1.jsx)("i", { className: "ph ph-bold ph-map-pin text-primary" }), (0, jsx_runtime_1.jsx)("div", { children: basics.location })] })), basics.phone && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-x-1.5", children: [(0, jsx_runtime_1.jsx)("i", { className: "ph ph-bold ph-phone text-primary" }), (0, jsx_runtime_1.jsx)("a", { href: `tel:${basics.phone}`, target: "_blank", rel: "noreferrer", children: basics.phone })] })), basics.email && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-x-1.5", children: [(0, jsx_runtime_1.jsx)("i", { className: "ph ph-bold ph-at text-primary" }), (0, jsx_runtime_1.jsx)("a", { href: `mailto:${basics.email}`, target: "_blank", rel: "noreferrer", children: basics.email })] })), (0, jsx_runtime_1.jsx)(Link, { url: basics.url }), basics.customFields.map((item) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-x-1.5", children: [(0, jsx_runtime_1.jsx)("i", { className: (0, utils_1.cn)(`ph ph-bold ph-${item.icon}`, "text-primary") }), (0, utils_1.isUrl)(item.value) ? ((0, jsx_runtime_1.jsx)("a", { href: item.value, target: "_blank", rel: "noreferrer noopener nofollow", children: item.name || item.value })) : ((0, jsx_runtime_1.jsx)("span", { children: [item.name, item.value].filter(Boolean).join(": ") }))] }, item.id)))] }), profiles.visible && profiles.items.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-x-3 gap-y-0.5", children: profiles.items
                            .filter((item) => item.visible)
                            .map((item) => ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-x-2", children: (0, jsx_runtime_1.jsx)(Link, { url: item.url, label: item.username, className: "text-sm", icon: (0, jsx_runtime_1.jsx)(brand_icon_1.BrandIcon, { slug: item.icon }) }) }, item.id))) }))] })] }));
};
const Rating = ({ level }) => ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-x-1.5", children: Array.from({ length: 5 }).map((_, index) => ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("h-3 w-6 border-2 border-primary", level > index && "bg-primary") }, index))) }));
const Link = ({ url, icon, iconOnRight, label, className }) => {
    if (!(0, utils_1.isUrl)(url.href))
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-x-1.5", children: [!iconOnRight && (icon !== null && icon !== void 0 ? icon : (0, jsx_runtime_1.jsx)("i", { className: "ph ph-bold ph-link text-primary" })), (0, jsx_runtime_1.jsx)("a", { href: url.href, target: "_blank", rel: "noreferrer noopener nofollow", className: (0, utils_1.cn)("inline-block", className), children: label !== null && label !== void 0 ? label : (url.label || url.href) }), iconOnRight && (icon !== null && icon !== void 0 ? icon : (0, jsx_runtime_1.jsx)("i", { className: "ph ph-bold ph-link text-primary" }))] }));
};
const LinkedEntity = ({ name, url, separateLinks, className }) => {
    return !separateLinks && (0, utils_1.isUrl)(url.href) ? ((0, jsx_runtime_1.jsx)(Link, { url: url, label: name, icon: (0, jsx_runtime_1.jsx)("i", { className: "ph ph-bold ph-globe text-primary" }), iconOnRight: true, className: className })) : ((0, jsx_runtime_1.jsx)("div", { className: className, children: name }));
};
const Section = ({ section, children, className, urlKey, levelKey, summaryKey, keywordsKey, }) => {
    if (!section.visible || section.items.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsxs)("section", { id: section.id, className: "grid", children: [(0, jsx_runtime_1.jsx)("h4", { className: "mb-2 border-b border-primary text-left font-bold text-primary", children: section.name }), (0, jsx_runtime_1.jsx)("div", { className: "grid gap-x-6 gap-y-3", style: { gridTemplateColumns: `repeat(${section.columns}, 1fr)` }, children: section.items
                    .filter((item) => item.visible)
                    .map((item) => {
                    const url = (urlKey && (0, lodash_get_1.default)(item, urlKey));
                    const level = (levelKey && (0, lodash_get_1.default)(item, levelKey, 0));
                    const summary = (summaryKey && (0, lodash_get_1.default)(item, summaryKey, ""));
                    const keywords = (keywordsKey && (0, lodash_get_1.default)(item, keywordsKey, []));
                    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("space-y-2", className), children: [(0, jsx_runtime_1.jsx)("div", { children: children === null || children === void 0 ? void 0 : children(item) }), summary !== undefined && !(0, utils_1.isEmptyString)(summary) && ((0, jsx_runtime_1.jsx)("div", { dangerouslySetInnerHTML: { __html: summary }, className: "wysiwyg" })), level !== undefined && level > 0 && (0, jsx_runtime_1.jsx)(Rating, { level: level }), keywords !== undefined && keywords.length > 0 && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: keywords.join(", ") })), url !== undefined && section.separateLinks && (0, jsx_runtime_1.jsx)(Link, { url: url })] }, item.id));
                }) })] }));
};
const Experience = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.experience);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, urlKey: "url", summaryKey: "summary", children: (item) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(LinkedEntity, { name: item.company, url: item.url, separateLinks: section.separateLinks, className: "font-bold" }), (0, jsx_runtime_1.jsx)("div", { children: item.position }), (0, jsx_runtime_1.jsx)("div", { children: item.location }), (0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.date })] })) }));
};
const Education = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.education);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, urlKey: "url", summaryKey: "summary", children: (item) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(LinkedEntity, { name: item.institution, url: item.url, separateLinks: section.separateLinks, className: "font-bold" }), (0, jsx_runtime_1.jsx)("div", { children: item.area }), (0, jsx_runtime_1.jsx)("div", { children: item.score }), (0, jsx_runtime_1.jsx)("div", { children: item.studyType }), (0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.date })] })) }));
};
const Awards = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.awards);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, urlKey: "url", summaryKey: "summary", children: (item) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.title }), (0, jsx_runtime_1.jsx)(LinkedEntity, { name: item.awarder, url: item.url, separateLinks: section.separateLinks }), (0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.date })] })) }));
};
const Certifications = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.certifications);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, urlKey: "url", summaryKey: "summary", children: (item) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.name }), (0, jsx_runtime_1.jsx)(LinkedEntity, { name: item.issuer, url: item.url, separateLinks: section.separateLinks }), (0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.date })] })) }));
};
const Skills = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.skills);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, levelKey: "level", keywordsKey: "keywords", children: (item) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.name }), (0, jsx_runtime_1.jsx)("div", { children: item.description })] })) }));
};
const Interests = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.interests);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, keywordsKey: "keywords", className: "space-y-0.5", children: (item) => (0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.name }) }));
};
const Publications = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.publications);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, urlKey: "url", summaryKey: "summary", children: (item) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(LinkedEntity, { name: item.name, url: item.url, separateLinks: section.separateLinks, className: "font-bold" }), (0, jsx_runtime_1.jsx)("div", { children: item.publisher }), (0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.date })] })) }));
};
const Volunteer = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.volunteer);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, urlKey: "url", summaryKey: "summary", children: (item) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(LinkedEntity, { name: item.organization, url: item.url, separateLinks: section.separateLinks, className: "font-bold" }), (0, jsx_runtime_1.jsx)("div", { children: item.position }), (0, jsx_runtime_1.jsx)("div", { children: item.location }), (0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.date })] })) }));
};
const Languages = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.languages);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, levelKey: "level", children: (item) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.name }), (0, jsx_runtime_1.jsx)("div", { children: item.description })] })) }));
};
const Projects = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.projects);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, urlKey: "url", summaryKey: "summary", keywordsKey: "keywords", children: (item) => ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(LinkedEntity, { name: item.name, url: item.url, separateLinks: section.separateLinks, className: "font-bold" }), (0, jsx_runtime_1.jsx)("div", { children: item.description }), (0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.date })] }) })) }));
};
const References = () => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.references);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, urlKey: "url", summaryKey: "summary", children: (item) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(LinkedEntity, { name: item.name, url: item.url, separateLinks: section.separateLinks, className: "font-bold" }), (0, jsx_runtime_1.jsx)("div", { children: item.description })] })) }));
};
const Custom = ({ id }) => {
    const section = (0, artboard_1.useArtboardStore)((state) => state.resume.sections.custom[id]);
    return ((0, jsx_runtime_1.jsx)(Section, { section: section, urlKey: "url", summaryKey: "summary", keywordsKey: "keywords", children: (item) => ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(LinkedEntity, { name: item.name, url: item.url, separateLinks: section.separateLinks, className: "font-bold" }), (0, jsx_runtime_1.jsx)("div", { children: item.description }), (0, jsx_runtime_1.jsx)("div", { children: item.location }), (0, jsx_runtime_1.jsx)("div", { className: "font-bold", children: item.date })] }) })) }));
};
const mapSectionToComponent = (section) => {
    switch (section) {
        case "experience": {
            return (0, jsx_runtime_1.jsx)(Experience, {});
        }
        case "education": {
            return (0, jsx_runtime_1.jsx)(Education, {});
        }
        case "awards": {
            return (0, jsx_runtime_1.jsx)(Awards, {});
        }
        case "certifications": {
            return (0, jsx_runtime_1.jsx)(Certifications, {});
        }
        case "skills": {
            return (0, jsx_runtime_1.jsx)(Skills, {});
        }
        case "interests": {
            return (0, jsx_runtime_1.jsx)(Interests, {});
        }
        case "publications": {
            return (0, jsx_runtime_1.jsx)(Publications, {});
        }
        case "volunteer": {
            return (0, jsx_runtime_1.jsx)(Volunteer, {});
        }
        case "languages": {
            return (0, jsx_runtime_1.jsx)(Languages, {});
        }
        case "projects": {
            return (0, jsx_runtime_1.jsx)(Projects, {});
        }
        case "references": {
            return (0, jsx_runtime_1.jsx)(References, {});
        }
        default: {
            if (section.startsWith("custom."))
                return (0, jsx_runtime_1.jsx)(Custom, { id: section.split(".")[1] });
            return null;
        }
    }
};
const Leafish = ({ columns, isFirstPage = false }) => {
    const [main, sidebar] = columns;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [isFirstPage && (0, jsx_runtime_1.jsx)(Header, {}), (0, jsx_runtime_1.jsxs)("div", { className: "p-custom grid grid-cols-2 items-start space-x-6", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("grid gap-y-4", sidebar.length === 0 && "col-span-2"), children: main.map((section) => ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: mapSectionToComponent(section) }, section))) }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("grid gap-y-4", sidebar.length === 0 && "hidden"), children: sidebar.map((section) => ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: mapSectionToComponent(section) }, section))) })] })] }));
};
exports.Leafish = Leafish;
