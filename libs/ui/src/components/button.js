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
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_slot_1 = require("@radix-ui/react-slot");
const utils_1 = require("@reactive-resume/utils");
const react_1 = require("react");
const button_1 = require("../variants/button");
exports.Button = (0, react_1.forwardRef)((_a, ref) => {
    var { className, variant, size, asChild = false } = _a, props = __rest(_a, ["className", "variant", "size", "asChild"]);
    const Component = asChild ? react_slot_1.Slot : "button";
    return ((0, jsx_runtime_1.jsx)(Component, Object.assign({ ref: ref, className: (0, utils_1.cn)((0, button_1.buttonVariants)({ variant, size, className })) }, props)));
});
exports.Button.displayName = "Button";
