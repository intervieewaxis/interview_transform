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
exports.AccordionContent = exports.AccordionTrigger = exports.AccordionItem = exports.Accordion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@phosphor-icons/react");
const AccordionPrimitive = __importStar(require("@radix-ui/react-accordion"));
const utils_1 = require("@reactive-resume/utils");
const react_2 = require("react");
exports.Accordion = AccordionPrimitive.Root;
exports.AccordionItem = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AccordionPrimitive.Item, Object.assign({ ref: ref, className: (0, utils_1.cn)("border-b", className) }, props)));
});
exports.AccordionItem.displayName = "AccordionItem";
exports.AccordionTrigger = (0, react_2.forwardRef)((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsx)(AccordionPrimitive.Header, { className: "flex", children: (0, jsx_runtime_1.jsxs)(AccordionPrimitive.Trigger, Object.assign({ ref: ref, className: (0, utils_1.cn)("flex flex-1 items-center justify-between py-4 font-medium leading-none outline-none transition-all hover:underline focus-visible:bg-secondary-accent [&[data-state=open]>svg]:rotate-180", className) }, props, { children: [children, (0, jsx_runtime_1.jsx)(react_1.CaretDown, { className: "size-4 shrink-0 transition-transform duration-200" })] })) }));
});
exports.AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
exports.AccordionContent = (0, react_2.forwardRef)((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsx)(AccordionPrimitive.Content, Object.assign({ ref: ref, className: (0, utils_1.cn)("overflow-hidden text-sm leading-relaxed transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", className) }, props, { children: (0, jsx_runtime_1.jsx)("div", { className: "pb-4 pt-0", children: children }) })));
});
exports.AccordionContent.displayName = AccordionPrimitive.Content.displayName;
