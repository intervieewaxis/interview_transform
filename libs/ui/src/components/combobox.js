"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combobox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@phosphor-icons/react");
const utils_1 = require("@reactive-resume/utils");
const react_2 = require("react");
const button_1 = require("./button");
const command_1 = require("./command");
const popover_1 = require("./popover");
const handleSingleSelect = (props, option) => {
    var _a, _b;
    if (props.clearable) {
        (_a = props.onValueChange) === null || _a === void 0 ? void 0 : _a.call(props, option.value === props.value ? "" : option.value);
    }
    else {
        (_b = props.onValueChange) === null || _b === void 0 ? void 0 : _b.call(props, option.value);
    }
};
const handleMultipleSelect = (props, option) => {
    var _a, _b, _c, _d;
    if ((_a = props.value) === null || _a === void 0 ? void 0 : _a.includes(option.value)) {
        if (!props.clearable && props.value.length === 1)
            return false;
        (_b = props.onValueChange) === null || _b === void 0 ? void 0 : _b.call(props, props.value.filter((value) => value !== option.value));
    }
    else {
        (_c = props.onValueChange) === null || _c === void 0 ? void 0 : _c.call(props, [...((_d = props.value) !== null && _d !== void 0 ? _d : []), option.value]);
    }
};
exports.Combobox = (0, react_2.forwardRef)((props, ref) => {
    var _a, _b, _c, _d;
    const [open, setOpen] = (0, react_2.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(popover_1.Popover, { open: open, onOpenChange: setOpen, children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { role: "combobox", variant: "outline", "aria-expanded": open, className: "w-full justify-between hover:bg-secondary/20 active:scale-100", children: [(0, jsx_runtime_1.jsxs)("span", { className: "line-clamp-1 text-left font-normal", children: [props.multiple && props.value && props.value.length > 0 && ((0, jsx_runtime_1.jsx)("span", { className: "mr-2", children: props.value.join(", ") })), !props.multiple &&
                                    props.value &&
                                    props.value !== "" &&
                                    ((_a = props.options.find((option) => option.value === props.value)) === null || _a === void 0 ? void 0 : _a.label), !props.value ||
                                    (props.value.length === 0 && ((_b = props.selectPlaceholder) !== null && _b !== void 0 ? _b : "Select an option"))] }), (0, jsx_runtime_1.jsx)(react_1.CaretDown, { className: (0, utils_1.cn)("ml-2 size-4 shrink-0 rotate-0 opacity-50 transition-transform", open && "rotate-180") })] }) }), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { align: "start", className: "p-0", children: (0, jsx_runtime_1.jsxs)(command_1.Command, { children: [(0, jsx_runtime_1.jsx)(command_1.CommandInput, { ref: ref, placeholder: (_c = props.searchPlaceholder) !== null && _c !== void 0 ? _c : "Search for an option" }), (0, jsx_runtime_1.jsxs)(command_1.CommandList, { children: [(0, jsx_runtime_1.jsx)(command_1.CommandEmpty, { children: (_d = props.emptyText) !== null && _d !== void 0 ? _d : "No results found" }), (0, jsx_runtime_1.jsx)(command_1.CommandGroup, { children: props.options.map((option) => {
                                        var _a;
                                        return ((0, jsx_runtime_1.jsxs)(command_1.CommandItem, { value: option.value.toLowerCase().trim(), onSelect: (selectedValue) => {
                                                const option = props.options.find((option) => option.value.toLowerCase().trim() === selectedValue);
                                                if (!option)
                                                    return null;
                                                if (props.multiple) {
                                                    handleMultipleSelect(props, option);
                                                }
                                                else {
                                                    handleSingleSelect(props, option);
                                                    setOpen(false);
                                                }
                                            }, children: [(0, jsx_runtime_1.jsx)(react_1.Check, { className: (0, utils_1.cn)("mr-2 size-4 opacity-0", !props.multiple && props.value === option.value && "opacity-100", props.multiple && ((_a = props.value) === null || _a === void 0 ? void 0 : _a.includes(option.value)) && "opacity-100") }), option.label] }, option.value));
                                    }) })] })] }) })] }));
});
