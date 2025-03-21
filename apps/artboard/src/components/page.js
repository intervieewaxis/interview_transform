"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = exports.MM_TO_PX = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hooks_1 = require("@reactive-resume/hooks");
const utils_1 = require("@reactive-resume/utils");
const artboard_1 = require("../store/artboard");
exports.MM_TO_PX = 3.78;
const Page = ({ mode = "preview", pageNumber, children }) => {
    const { isDarkMode } = (0, hooks_1.useTheme)();
    const page = (0, artboard_1.useArtboardStore)((state) => state.resume.metadata.page);
    const fontFamily = (0, artboard_1.useArtboardStore)((state) => state.resume.metadata.typography.font.family);
    return ((0, jsx_runtime_1.jsxs)("div", { "data-page": pageNumber, className: (0, utils_1.cn)("relative bg-background text-foreground", mode === "builder" && "shadow-2xl"), style: {
            fontFamily,
            width: `${utils_1.pageSizeMap[page.format].width * exports.MM_TO_PX}px`,
            minHeight: `${utils_1.pageSizeMap[page.format].height * exports.MM_TO_PX}px`,
        }, children: [mode === "builder" && page.options.pageNumbers && ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("absolute -top-7 left-0 font-bold", isDarkMode && "text-white"), children: ["Page ", pageNumber] })), children, mode === "builder" && page.options.breakLine && ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-x-0 border-b border-dashed", style: {
                    top: `${utils_1.pageSizeMap[page.format].height * exports.MM_TO_PX}px`,
                } }))] }));
};
exports.Page = Page;
