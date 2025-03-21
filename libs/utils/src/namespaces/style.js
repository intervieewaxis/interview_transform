"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = exports.breakpoints = void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
exports.breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1400,
};
const cn = (...inputs) => (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
exports.cn = cn;
