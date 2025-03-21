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
exports.AlertDescription = exports.AlertTitle = exports.Alert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@reactive-resume/utils");
const react_1 = require("react");
const alert_1 = require("../variants/alert");
exports.Alert = (0, react_1.forwardRef)((_a, ref) => {
    var { className, variant } = _a, props = __rest(_a, ["className", "variant"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: ref, role: "alert", className: (0, utils_1.cn)((0, alert_1.alertVariants)({ variant }), className) }, props)));
});
exports.Alert.displayName = "Alert";
exports.AlertTitle = (0, react_1.forwardRef)((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsx)("h5", Object.assign({ ref: ref, className: (0, utils_1.cn)("font-medium tracking-tight", className) }, props, { children: children })));
});
exports.AlertTitle.displayName = "AlertTitle";
exports.AlertDescription = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: ref, className: (0, utils_1.cn)("pt-0.5 leading-normal", className) }, props)));
});
exports.AlertDescription.displayName = "AlertDescription";
