"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToRgb = void 0;
const hexToRgb = (hex, alpha = 0) => {
    const r = Number.parseInt(hex.slice(1, 3), 16), g = Number.parseInt(hex.slice(3, 5), 16), b = Number.parseInt(hex.slice(5, 7), 16);
    return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
};
exports.hexToRgb = hexToRgb;
