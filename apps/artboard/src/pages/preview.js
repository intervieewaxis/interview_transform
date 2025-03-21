"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewLayout = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const page_1 = require("../components/page");
const artboard_1 = require("../store/artboard");
const templates_1 = require("../templates");
const PreviewLayout = () => {
    const layout = (0, artboard_1.useArtboardStore)((state) => state.resume.metadata.layout);
    const template = (0, artboard_1.useArtboardStore)((state) => state.resume.metadata.template);
    const Template = (0, react_1.useMemo)(() => (0, templates_1.getTemplate)(template), [template]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: layout.map((columns, pageIndex) => ((0, jsx_runtime_1.jsx)(page_1.Page, { mode: "preview", pageNumber: pageIndex + 1, children: (0, jsx_runtime_1.jsx)(Template, { isFirstPage: pageIndex === 0, columns: columns }) }, pageIndex))) }));
};
exports.PreviewLayout = PreviewLayout;
