"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderLayout = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@reactive-resume/utils");
const framer_motion_1 = require("framer-motion");
const react_1 = require("react");
const react_zoom_pan_pinch_1 = require("react-zoom-pan-pinch");
const page_1 = require("../components/page");
const artboard_1 = require("../store/artboard");
const templates_1 = require("../templates");
const BuilderLayout = () => {
    const [wheelPanning, setWheelPanning] = (0, react_1.useState)(true);
    const transformRef = (0, react_1.useRef)(null);
    const layout = (0, artboard_1.useArtboardStore)((state) => state.resume.metadata.layout);
    const format = (0, artboard_1.useArtboardStore)((state) => state.resume.metadata.page.format);
    const template = (0, artboard_1.useArtboardStore)((state) => state.resume.metadata.template);
    const Template = (0, react_1.useMemo)(() => (0, templates_1.getTemplate)(template), [template]);
    (0, react_1.useEffect)(() => {
        const handleMessage = (event) => {
            var _a, _b, _c, _d;
            if (event.origin !== window.location.origin)
                return;
            if (event.data.type === "ZOOM_IN")
                (_a = transformRef.current) === null || _a === void 0 ? void 0 : _a.zoomIn(0.2);
            if (event.data.type === "ZOOM_OUT")
                (_b = transformRef.current) === null || _b === void 0 ? void 0 : _b.zoomOut(0.2);
            if (event.data.type === "CENTER_VIEW")
                (_c = transformRef.current) === null || _c === void 0 ? void 0 : _c.centerView();
            if (event.data.type === "RESET_VIEW") {
                (_d = transformRef.current) === null || _d === void 0 ? void 0 : _d.resetTransform(0);
                setTimeout(() => { var _a; return (_a = transformRef.current) === null || _a === void 0 ? void 0 : _a.centerView(0.8, 0); }, 10);
            }
            if (event.data.type === "TOGGLE_PAN_MODE") {
                setWheelPanning(event.data.panMode);
            }
        };
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [transformRef]);
    return ((0, jsx_runtime_1.jsx)(react_zoom_pan_pinch_1.TransformWrapper, { ref: transformRef, centerOnInit: true, maxScale: 2, minScale: 0.4, initialScale: 0.8, limitToBounds: false, wheel: { wheelDisabled: wheelPanning }, panning: { wheelPanning: wheelPanning }, children: (0, jsx_runtime_1.jsx)(react_zoom_pan_pinch_1.TransformComponent, { wrapperClass: "!w-screen !h-screen", contentClass: "grid items-start justify-center space-x-12 pointer-events-none", contentStyle: {
                width: `${layout.length * (utils_1.pageSizeMap[format].width * page_1.MM_TO_PX + 42)}px`,
                gridTemplateColumns: `repeat(${layout.length}, 1fr)`,
            }, children: (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: layout.map((columns, pageIndex) => ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { layout: true, initial: { opacity: 0, x: -200, y: 0 }, animate: { opacity: 1, x: 0, transition: { delay: pageIndex * 0.3 } }, exit: { opacity: 0, x: -200 }, children: (0, jsx_runtime_1.jsx)(page_1.Page, { mode: "builder", pageNumber: pageIndex + 1, children: (0, jsx_runtime_1.jsx)(Template, { isFirstPage: pageIndex === 0, columns: columns }) }) }, pageIndex))) }) }) }));
};
exports.BuilderLayout = BuilderLayout;
