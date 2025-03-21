"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useArtboardStore = void 0;
const zustand_1 = require("zustand");
exports.useArtboardStore = (0, zustand_1.create)()((set) => ({
    resume: null,
    setResume: (resume) => {
        set({ resume });
    },
}));
