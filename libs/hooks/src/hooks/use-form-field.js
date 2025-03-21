"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormField = exports.FormItemContext = exports.FormFieldContext = void 0;
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
exports.FormFieldContext = (0, react_1.createContext)({});
exports.FormItemContext = (0, react_1.createContext)({});
const useFormField = () => {
    const fieldContext = (0, react_1.useContext)(exports.FormFieldContext);
    const itemContext = (0, react_1.useContext)(exports.FormItemContext);
    const { getFieldState, formState } = (0, react_hook_form_1.useFormContext)();
    if (!fieldContext || !itemContext) {
        throw new Error("useFormField should be used within <FormField>");
    }
    const fieldState = getFieldState(fieldContext.name, formState);
    const { id } = itemContext;
    return Object.assign({ id, name: fieldContext.name, formItemId: `${id}-form-item`, formDescriptionId: `${id}-form-item-description`, formMessageId: `${id}-form-item-message` }, fieldState);
};
exports.useFormField = useFormField;
