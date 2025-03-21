"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtboardPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_1 = require("react-router");
const webfontloader_1 = __importDefault(require("webfontloader"));
const artboard_1 = require("../store/artboard");
const ArtboardPage = () => {
    const metadata = (0, artboard_1.useArtboardStore)((state) => state.resume.metadata);
    const fontString = (0, react_1.useMemo)(() => {
        const family = metadata.typography.font.family;
        const variants = metadata.typography.font.variants.join(",");
        const subset = metadata.typography.font.subset;
        return `${family}:${variants}:${subset}`;
    }, [metadata.typography.font]);
    (0, react_1.useEffect)(() => {
        webfontloader_1.default.load({
            google: { families: [fontString] },
            active: () => {
                const width = window.document.body.offsetWidth;
                const height = window.document.body.offsetHeight;
                const message = { type: "PAGE_LOADED", payload: { width, height } };
                window.postMessage(message, "*");
            },
        });
    }, [fontString]);
    // Font Size & Line Height
    (0, react_1.useEffect)(() => {
        document.documentElement.style.setProperty("font-size", `${metadata.typography.font.size}px`);
        document.documentElement.style.setProperty("line-height", `${metadata.typography.lineHeight}`);
        document.documentElement.style.setProperty("--margin", `${metadata.page.margin}px`);
        document.documentElement.style.setProperty("--font-size", `${metadata.typography.font.size}px`);
        document.documentElement.style.setProperty("--line-height", `${metadata.typography.lineHeight}`);
        document.documentElement.style.setProperty("--color-foreground", metadata.theme.text);
        document.documentElement.style.setProperty("--color-primary", metadata.theme.primary);
        document.documentElement.style.setProperty("--color-background", metadata.theme.background);
    }, [metadata]);
    // Typography Options
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line unicorn/prefer-spread
        const elements = Array.from(document.querySelectorAll(`[data-page]`));
        for (const el of elements) {
            el.classList.toggle("hide-icons", metadata.typography.hideIcons);
            el.classList.toggle("underline-links", metadata.typography.underlineLinks);
        }
    }, [metadata]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [metadata.css.visible && (0, jsx_runtime_1.jsx)("style", { lang: "css", children: `[data-page] { ${metadata.css.value} }` }), (0, jsx_runtime_1.jsx)(react_router_1.Outlet, {})] }));
};
exports.ArtboardPage = ArtboardPage;
