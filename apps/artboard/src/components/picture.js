"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Picture = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@reactive-resume/utils");
const artboard_1 = require("../store/artboard");
const Picture = ({ className }) => {
    const picture = (0, artboard_1.useArtboardStore)((state) => state.resume.basics.picture);
    const fontSize = (0, artboard_1.useArtboardStore)((state) => state.resume.metadata.typography.font.size);
    if (!(0, utils_1.isUrl)(picture.url) || picture.effects.hidden)
        return null;
    return ((0, jsx_runtime_1.jsx)("img", { src: picture.url, alt: "Profile", className: (0, utils_1.cn)("relative z-20 object-cover", picture.effects.border && "border-primary", picture.effects.grayscale && "grayscale", className), style: {
            maxWidth: `${picture.size}px`,
            aspectRatio: `${picture.aspectRatio}`,
            borderRadius: `${picture.borderRadius}px`,
            borderWidth: `${picture.effects.border ? fontSize / 3 : 0}px`,
        } }));
};
exports.Picture = Picture;
