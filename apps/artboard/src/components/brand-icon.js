"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const BrandIcon = ({ slug }) => {
    if (slug === "linkedin") {
        return ((0, jsx_runtime_1.jsx)("img", { alt: "linkedin", className: "size-4", src: `${window.location.origin}/support-logos/linkedin.svg` }));
    }
    return (0, jsx_runtime_1.jsx)("img", { alt: slug, className: "size-4", src: `https://cdn.simpleicons.org/${slug}` });
};
exports.BrandIcon = BrandIcon;
