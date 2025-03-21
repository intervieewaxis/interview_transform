"use strict";
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
exports.CommandItem = exports.CommandSeparator = exports.CommandGroup = exports.CommandEmpty = exports.CommandList = exports.CommandInput = exports.CommandDialog = exports.Command = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@phosphor-icons/react");
const utils_1 = require("@reactive-resume/utils");
const cmdk_1 = require("cmdk");
const react_2 = require("react");
const dialog_1 = require("./dialog");
exports.Command = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(cmdk_1.Command, Object.assign({ ref: ref, className: (0, utils_1.cn)("flex size-full flex-col overflow-hidden rounded border", className) }, props)));
});
exports.Command.displayName = cmdk_1.Command.displayName;
const CommandDialog = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, Object.assign({}, props, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, { className: "overflow-hidden p-0", children: (0, jsx_runtime_1.jsx)(exports.Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-secondary [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5", children: children }) }) })));
};
exports.CommandDialog = CommandDialog;
exports.CommandInput = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [(0, jsx_runtime_1.jsx)(react_1.MagnifyingGlass, { size: 16, className: "mr-1 shrink-0 opacity-50" }), (0, jsx_runtime_1.jsx)(cmdk_1.Command.Input, Object.assign({ ref: ref, className: (0, utils_1.cn)("flex h-9 w-full rounded border-none bg-transparent py-3 text-sm outline-none focus:ring-transparent disabled:cursor-not-allowed disabled:opacity-50", className) }, props))] }));
});
exports.CommandInput.displayName = cmdk_1.Command.Input.displayName;
exports.CommandList = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(cmdk_1.Command.List, Object.assign({ ref: ref, className: (0, utils_1.cn)("max-h-[300px] overflow-y-auto overflow-x-hidden", className) }, props)));
});
exports.CommandList.displayName = cmdk_1.Command.List.displayName;
exports.CommandEmpty = (0, react_2.forwardRef)((props, ref) => ((0, jsx_runtime_1.jsx)(cmdk_1.Command.Empty, Object.assign({ ref: ref, className: "py-6 text-center text-sm" }, props))));
exports.CommandEmpty.displayName = cmdk_1.Command.Empty.displayName;
exports.CommandGroup = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(cmdk_1.Command.Group, Object.assign({ ref: ref, className: (0, utils_1.cn)("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:opacity-60", className) }, props)));
});
exports.CommandGroup.displayName = cmdk_1.Command.Group.displayName;
exports.CommandSeparator = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(cmdk_1.Command.Separator, Object.assign({ ref: ref, className: (0, utils_1.cn)("-mx-1 h-px bg-border", className) }, props)));
});
exports.CommandSeparator.displayName = cmdk_1.Command.Separator.displayName;
exports.CommandItem = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(cmdk_1.Command.Item, Object.assign({ ref: ref, className: (0, utils_1.cn)("relative flex cursor-default select-none items-center rounded px-2 py-1.5 text-sm outline-none aria-selected:bg-secondary/40 aria-selected:text-secondary-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50", className) }, props)));
});
exports.CommandItem.displayName = cmdk_1.Command.Item.displayName;
