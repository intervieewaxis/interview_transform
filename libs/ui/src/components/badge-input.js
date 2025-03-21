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
exports.BadgeInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const input_1 = require("./input");
exports.BadgeInput = (0, react_1.forwardRef)((_a, ref) => {
    var { value, onChange, setPendingKeyword } = _a, props = __rest(_a, ["value", "onChange", "setPendingKeyword"]);
    const [label, setLabel] = (0, react_1.useState)("");
    const processInput = (0, react_1.useCallback)(() => {
        const newLabels = label
            .split(",")
            .map((str) => str.trim())
            .filter(Boolean)
            .filter((str) => !value.includes(str));
        onChange([...new Set([...value, ...newLabels])]);
        setLabel("");
    }, [label, value, onChange]);
    (0, react_1.useEffect)(() => {
        if (label.includes(",")) {
            processInput();
        }
    }, [label, processInput]);
    (0, react_1.useEffect)(() => {
        if (setPendingKeyword)
            setPendingKeyword(label);
    }, [label, setPendingKeyword]);
    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            processInput();
        }
    };
    return ((0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({}, props, { ref: ref, value: label, onKeyDown: onKeyDown, onChange: (event) => {
            setLabel(event.target.value);
        } })));
});
