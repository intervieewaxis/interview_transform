"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linearTransform = void 0;
const linearTransform = (value, inMin, inMax, outMin, outMax) => {
    if (inMax === inMin)
        return value === inMax ? outMin : Number.NaN;
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
exports.linearTransform = linearTransform;
