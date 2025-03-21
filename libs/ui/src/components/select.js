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
exports.SelectSeparator = exports.SelectItem = exports.SelectLabel = exports.SelectContent = exports.SelectTrigger = exports.SelectValue = exports.SelectGroup = exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@phosphor-icons/react");
const SelectPrimitive = __importStar(require("@radix-ui/react-select"));
const utils_1 = require("@reactive-resume/utils");
const react_2 = require("react");
exports.Select = SelectPrimitive.Root;
exports.SelectGroup = SelectPrimitive.Group;
exports.SelectValue = SelectPrimitive.Value;
exports.SelectTrigger = (0, react_2.forwardRef)((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsxs)(SelectPrimitive.Trigger, Object.assign({ ref: ref, className: (0, utils_1.cn)("flex h-9 w-full items-center justify-between rounded border border-border bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-secondary-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50", className) }, props, { children: [children, (0, jsx_runtime_1.jsx)(SelectPrimitive.Icon, { asChild: true, children: (0, jsx_runtime_1.jsx)(react_1.CaretUpDown, { className: "size-4 opacity-50" }) })] })));
});
exports.SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
exports.SelectContent = (0, react_2.forwardRef)((_a, ref) => {
    var { className, children, position = "popper" } = _a, props = __rest(_a, ["className", "children", "position"]);
    return ((0, jsx_runtime_1.jsx)(SelectPrimitive.Portal, { children: (0, jsx_runtime_1.jsx)(SelectPrimitive.Content, Object.assign({ ref: ref, className: (0, utils_1.cn)("relative z-50 min-w-32 overflow-hidden rounded border border-border bg-background text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className), position: position }, props, { children: (0, jsx_runtime_1.jsx)(SelectPrimitive.Viewport, { className: (0, utils_1.cn)("p-1", position === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"), children: children }) })) }));
});
exports.SelectContent.displayName = SelectPrimitive.Content.displayName;
exports.SelectLabel = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(SelectPrimitive.Label, Object.assign({ ref: ref, className: (0, utils_1.cn)("px-2 py-1.5 text-sm font-semibold", className) }, props)));
});
exports.SelectLabel.displayName = SelectPrimitive.Label.displayName;
exports.SelectItem = (0, react_2.forwardRef)((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsxs)(SelectPrimitive.Item, Object.assign({ ref: ref, className: (0, utils_1.cn)("relative flex w-full cursor-default select-none items-center rounded py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className) }, props, { children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: (0, jsx_runtime_1.jsx)(SelectPrimitive.ItemIndicator, { children: (0, jsx_runtime_1.jsx)(react_1.Check, { className: "size-4" }) }) }), (0, jsx_runtime_1.jsx)(SelectPrimitive.ItemText, { children: children })] })));
});
exports.SelectItem.displayName = SelectPrimitive.Item.displayName;
exports.SelectSeparator = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(SelectPrimitive.Separator, Object.assign({ ref: ref, className: (0, utils_1.cn)("-mx-1 my-1 h-px opacity-60", className) }, props)));
});
exports.SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
