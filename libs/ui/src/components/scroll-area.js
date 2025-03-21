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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollBar = exports.ScrollArea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ScrollAreaPrimitive = __importStar(require("@radix-ui/react-scroll-area"));
const utils_1 = require("@reactive-resume/utils");
const react_1 = require("react");
exports.ScrollArea = (0, react_1.forwardRef)((_a, ref) => {
    var { type = "scroll", orientation = "vertical", hideScrollbar = false, allowOverflow = false, className, children } = _a, props = __rest(_a, ["type", "orientation", "hideScrollbar", "allowOverflow", "className", "children"]);
    return ((0, jsx_runtime_1.jsxs)(ScrollAreaPrimitive.Root, Object.assign({ ref: ref, type: type, className: (0, utils_1.cn)("relative overflow-hidden", className) }, props, { children: [(0, jsx_runtime_1.jsx)(ScrollAreaPrimitive.Viewport, { className: (0, utils_1.cn)("size-full rounded-[inherit]", allowOverflow && "!overflow-visible"), children: children }), (0, jsx_runtime_1.jsx)(exports.ScrollBar, { orientation: orientation, className: (0, utils_1.cn)(hideScrollbar && "opacity-0") }), (0, jsx_runtime_1.jsx)(ScrollAreaPrimitive.Corner, {})] })));
});
exports.ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
exports.ScrollBar = (0, react_1.forwardRef)((_a, ref) => {
    var { className, orientation } = _a, props = __rest(_a, ["className", "orientation"]);
    return ((0, jsx_runtime_1.jsx)(ScrollAreaPrimitive.ScrollAreaScrollbar, Object.assign({ ref: ref, orientation: orientation, className: (0, utils_1.cn)("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px", orientation === "horizontal" && "h-2.5 border-t border-t-transparent p-px", className) }, props, { children: (0, jsx_runtime_1.jsx)(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" }) })));
});
exports.ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
