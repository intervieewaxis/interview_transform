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
exports.TabsContent = exports.TabsTrigger = exports.TabsList = exports.Tabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TabsPrimitive = __importStar(require("@radix-ui/react-tabs"));
const utils_1 = require("@reactive-resume/utils");
const react_1 = require("react");
exports.Tabs = TabsPrimitive.Root;
exports.TabsList = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(TabsPrimitive.List, Object.assign({ ref: ref, className: (0, utils_1.cn)("inline-flex h-9 items-center justify-center rounded bg-secondary-accent px-0.5 text-foreground", className) }, props)));
});
exports.TabsList.displayName = TabsPrimitive.List.displayName;
exports.TabsTrigger = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(TabsPrimitive.Trigger, Object.assign({ ref: ref, className: (0, utils_1.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className) }, props)));
});
exports.TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
exports.TabsContent = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(TabsPrimitive.Content, Object.assign({ ref: ref, className: (0, utils_1.cn)("mt-3 focus-visible:outline-none focus-visible:ring-0", className) }, props)));
});
exports.TabsContent.displayName = TabsPrimitive.Content.displayName;
