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
exports.PanelResizeHandle = exports.Panel = exports.PanelGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@phosphor-icons/react");
const utils_1 = require("@reactive-resume/utils");
const PanelPrimitive = __importStar(require("react-resizable-panels"));
exports.PanelGroup = PanelPrimitive.PanelGroup;
exports.Panel = PanelPrimitive.Panel;
const PanelResizeHandle = (_a) => {
    var { className, isDragging, onDragging } = _a, props = __rest(_a, ["className", "isDragging", "onDragging"]);
    return ((0, jsx_runtime_1.jsxs)(PanelPrimitive.PanelResizeHandle, Object.assign({ className: (0, utils_1.cn)("relative h-screen", className), onDragging: onDragging }, props, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("absolute inset-y-0 left-0 z-50 w-1 rounded-lg pl-1 transition-all hover:bg-info hover:opacity-100", isDragging && "bg-info opacity-100") }) }), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-[-5px] z-50 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(react_1.DotsSixVertical, { size: 14, opacity: 0.75 }) })] })));
};
exports.PanelResizeHandle = PanelResizeHandle;
