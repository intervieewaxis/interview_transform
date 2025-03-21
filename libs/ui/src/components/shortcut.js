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
exports.KeyboardShortcut = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@reactive-resume/utils");
const react_1 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const KeyboardShortcut = (_a) => {
    var { className, defaultValue = false } = _a, props = __rest(_a, ["className", "defaultValue"]);
    const { value, setValue } = (0, usehooks_ts_1.useBoolean)(defaultValue);
    (0, react_1.useEffect)(() => {
        const onKeyDown = (e) => {
            e.key === "Control" && setValue(true);
        };
        const onKeyUp = (e) => {
            e.key === "Control" && setValue(false);
        };
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
        };
    }, [setValue]);
    return ((0, jsx_runtime_1.jsx)("span", Object.assign({ className: (0, utils_1.cn)("ml-auto text-xs tracking-widest transition-opacity", value ? "scale-100 opacity-60" : "scale-0 opacity-0", className) }, props)));
};
exports.KeyboardShortcut = KeyboardShortcut;
exports.KeyboardShortcut.displayName = "KeyboardShortcut";
