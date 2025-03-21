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
exports.DropdownMenuSeparator = exports.DropdownMenuLabel = exports.DropdownMenuRadioItem = exports.DropdownMenuCheckboxItem = exports.DropdownMenuItem = exports.DropdownMenuContent = exports.DropdownMenuSubContent = exports.DropdownMenuSubTrigger = exports.DropdownMenuRadioGroup = exports.DropdownMenuSub = exports.DropdownMenuPortal = exports.DropdownMenuGroup = exports.DropdownMenuTrigger = exports.DropdownMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@phosphor-icons/react");
const DropdownMenuPrimitive = __importStar(require("@radix-ui/react-dropdown-menu"));
const utils_1 = require("@reactive-resume/utils");
const react_2 = require("react");
exports.DropdownMenu = DropdownMenuPrimitive.Root;
exports.DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
exports.DropdownMenuGroup = DropdownMenuPrimitive.Group;
exports.DropdownMenuPortal = DropdownMenuPrimitive.Portal;
exports.DropdownMenuSub = DropdownMenuPrimitive.Sub;
exports.DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
exports.DropdownMenuSubTrigger = (0, react_2.forwardRef)((_a, ref) => {
    var { className, inset, children } = _a, props = __rest(_a, ["className", "inset", "children"]);
    return ((0, jsx_runtime_1.jsxs)(DropdownMenuPrimitive.SubTrigger, Object.assign({ ref: ref, className: (0, utils_1.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-secondary data-[state=open]:bg-secondary", inset && "pl-8", className) }, props, { children: [children, (0, jsx_runtime_1.jsx)(react_1.CaretRight, { className: "ml-auto size-4" })] })));
});
exports.DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
exports.DropdownMenuSubContent = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(exports.DropdownMenuPortal, { children: (0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.SubContent, Object.assign({ ref: ref, className: (0, utils_1.cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-background p-1 text-foreground shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className) }, props)) }));
});
exports.DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
exports.DropdownMenuContent = (0, react_2.forwardRef)((_a, ref) => {
    var { className, children, sideOffset = 6 } = _a, props = __rest(_a, ["className", "children", "sideOffset"]);
    return ((0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.Portal, { children: (0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.Content, Object.assign({ ref: ref, sideOffset: sideOffset, className: (0, utils_1.cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-background p-1 text-foreground shadow-sm", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className) }, props, { children: children })) }));
});
exports.DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
exports.DropdownMenuItem = (0, react_2.forwardRef)((_a, ref) => {
    var { className, inset } = _a, props = __rest(_a, ["className", "inset"]);
    return ((0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.Item, Object.assign({ ref: ref, className: (0, utils_1.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors ease-in-out focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className) }, props)));
});
exports.DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
exports.DropdownMenuCheckboxItem = (0, react_2.forwardRef)((_a, ref) => {
    var { className, children, checked } = _a, props = __rest(_a, ["className", "children", "checked"]);
    return ((0, jsx_runtime_1.jsxs)(DropdownMenuPrimitive.CheckboxItem, Object.assign({ ref: ref, className: (0, utils_1.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors ease-in-out focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), checked: checked }, props, { children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-2 flex size-3.5 items-center justify-center", children: (0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.ItemIndicator, { children: (0, jsx_runtime_1.jsx)(react_1.Check, { className: "size-4" }) }) }), children] })));
});
exports.DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
exports.DropdownMenuRadioItem = (0, react_2.forwardRef)((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsxs)(DropdownMenuPrimitive.RadioItem, Object.assign({ ref: ref, className: (0, utils_1.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors ease-in-out focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className) }, props, { children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-2 flex size-3.5 items-center justify-center", children: (0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.ItemIndicator, { children: (0, jsx_runtime_1.jsx)(react_1.DotOutline, { size: 18, weight: "fill", className: "fill-current" }) }) }), children] })));
});
exports.DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
exports.DropdownMenuLabel = (0, react_2.forwardRef)((_a, ref) => {
    var { className, inset } = _a, props = __rest(_a, ["className", "inset"]);
    return ((0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.Label, Object.assign({ ref: ref, className: (0, utils_1.cn)("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className) }, props)));
});
exports.DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
exports.DropdownMenuSeparator = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.Separator, Object.assign({ ref: ref, className: (0, utils_1.cn)("-mx-1 my-1 h-px bg-secondary", className) }, props)));
});
exports.DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
