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
exports.CardFooter = exports.CardContent = exports.CardDescription = exports.CardTitle = exports.CardHeader = exports.Card = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@reactive-resume/utils");
const react_1 = require("react");
exports.Card = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: ref, className: (0, utils_1.cn)("flex flex-col space-y-3 rounded border bg-background p-6", className) }, props)));
});
exports.Card.displayName = "Card";
exports.CardHeader = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: ref, className: (0, utils_1.cn)("flex flex-col space-y-1", className) }, props)));
});
exports.CardHeader.displayName = "CardHeader";
exports.CardTitle = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("h3", Object.assign({ ref: ref, className: (0, utils_1.cn)("font-semibold leading-normal tracking-tight", className) }, props, { children: props.children })));
});
exports.CardTitle.displayName = "CardTitle";
exports.CardDescription = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: ref, className: (0, utils_1.cn)("text-xs font-medium leading-relaxed opacity-80", className) }, props)));
});
exports.CardDescription.displayName = "CardDescription";
exports.CardContent = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ ref: ref, className: className }, props));
});
exports.CardContent.displayName = "CardContent";
exports.CardFooter = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: ref, className: (0, utils_1.cn)("flex items-center", className) }, props)));
});
exports.CardFooter.displayName = "CardFooter";
