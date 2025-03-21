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
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@reactive-resume/utils");
const react_1 = require("react");
exports.Input = (0, react_1.forwardRef)((_a, ref) => {
    var { className, type, hasError = false } = _a, props = __rest(_a, ["className", "type", "hasError"]);
    return ((0, jsx_runtime_1.jsx)("input", Object.assign({ ref: ref, type: type, autoComplete: "off", className: (0, utils_1.cn)("flex h-9 w-full rounded border border-border bg-transparent px-3 py-0.5 !text-sm ring-0 ring-offset-transparent transition-colors [appearance:textfield] placeholder:opacity-80 hover:bg-secondary/20 focus:border-primary focus:bg-secondary/20 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none", "file:border-0 file:bg-transparent file:pt-1 file:text-sm file:font-medium file:text-primary", hasError ? "border-error" : "border-border", className) }, props)));
});
exports.Input.displayName = "Input";
