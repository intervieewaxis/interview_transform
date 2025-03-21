"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePasswordToggle = void 0;
const react_1 = require("react");
const usePasswordToggle = (formRef) => {
    // Show Password on "Control" Key Down
    (0, react_1.useEffect)(() => {
        const onKeyDown = (event) => {
            var _a, _b;
            if (event.key === "Control") {
                (_b = (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('input[name="password"]')) === null || _b === void 0 ? void 0 : _b.setAttribute("type", "text");
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [formRef]);
    // Hide Password on "Control" Key Up
    (0, react_1.useEffect)(() => {
        const onKeyUp = (event) => {
            var _a, _b;
            if (event.key === "Control") {
                (_b = (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('input[name="password"]')) === null || _b === void 0 ? void 0 : _b.setAttribute("type", "password");
            }
        };
        window.addEventListener("keyup", onKeyUp);
        return () => {
            window.removeEventListener("keyup", onKeyUp);
        };
    }, [formRef]);
    return;
};
exports.usePasswordToggle = usePasswordToggle;
