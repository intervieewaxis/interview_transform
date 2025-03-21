"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieOptions = void 0;
const getCookieOptions = (grantType) => {
    var _a, _b;
    // Options For Access Token
    if (grantType === "access") {
        return {
            httpOnly: true,
            sameSite: "strict",
            secure: ((_a = process.env.PUBLIC_URL) !== null && _a !== void 0 ? _a : "").includes("https://"),
            expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes from now
        };
    }
    // Options For Refresh Token
    return {
        httpOnly: true,
        sameSite: "strict",
        secure: ((_b = process.env.PUBLIC_URL) !== null && _b !== void 0 ? _b : "").includes("https://"),
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    };
};
exports.getCookieOptions = getCookieOptions;
