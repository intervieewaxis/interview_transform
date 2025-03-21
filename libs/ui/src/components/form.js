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
exports.Form = exports.FormMessage = exports.FormDescription = exports.FormControl = exports.FormLabel = exports.FormItem = exports.FormField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_slot_1 = require("@radix-ui/react-slot");
const hooks_1 = require("@reactive-resume/hooks");
const utils_1 = require("@reactive-resume/utils");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const label_1 = require("./label");
const FormField = (_a) => {
    var props = __rest(_a, []);
    return ((0, jsx_runtime_1.jsx)(hooks_1.FormFieldContext.Provider, { value: { name: props.name }, children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, Object.assign({}, props)) }));
};
exports.FormField = FormField;
exports.FormItem = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    const id = (0, react_1.useId)();
    return ((0, jsx_runtime_1.jsx)(hooks_1.FormItemContext.Provider, { value: { id }, children: (0, jsx_runtime_1.jsx)("div", Object.assign({ ref: ref, className: (0, utils_1.cn)("w-full space-y-1", className) }, props)) }));
});
exports.FormItem.displayName = "FormItem";
exports.FormLabel = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    const { error, formItemId } = (0, hooks_1.useFormField)();
    return ((0, jsx_runtime_1.jsx)(label_1.Label, Object.assign({ ref: ref, htmlFor: formItemId, className: (0, utils_1.cn)(error && "text-error", className) }, props)));
});
exports.FormLabel.displayName = "FormLabel";
exports.FormControl = (0, react_1.forwardRef)((_a, ref) => {
    var props = __rest(_a, []);
    const { error, formItemId, formDescriptionId, formMessageId } = (0, hooks_1.useFormField)();
    return ((0, jsx_runtime_1.jsx)(react_slot_1.Slot, Object.assign({ ref: ref, id: formItemId, "aria-invalid": !!error, "aria-describedby": error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId }, props)));
});
exports.FormControl.displayName = "FormControl";
exports.FormDescription = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    const { formDescriptionId } = (0, hooks_1.useFormField)();
    return ((0, jsx_runtime_1.jsx)("p", Object.assign({ ref: ref, id: formDescriptionId, className: (0, utils_1.cn)("text-xs leading-relaxed opacity-60", className) }, props)));
});
exports.FormDescription.displayName = "FormDescription";
exports.FormMessage = (0, react_1.forwardRef)((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    const { error, formMessageId } = (0, hooks_1.useFormField)();
    const body = error ? String(error.message) : children;
    if (!body) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("p", Object.assign({ ref: ref, id: formMessageId, className: (0, utils_1.cn)("text-xs font-medium leading-relaxed text-error", className) }, props, { children: body })));
});
exports.FormMessage.displayName = "FormMessage";
var react_hook_form_2 = require("react-hook-form");
Object.defineProperty(exports, "Form", { enumerable: true, get: function () { return react_hook_form_2.FormProvider; } });
