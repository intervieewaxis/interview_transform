"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBreakpoint = void 0;
const utils_1 = require("@reactive-resume/utils");
const react_1 = require("react");
const use_breakpoint_1 = require("use-breakpoint");
const useBreakpoint = () => {
    const { breakpoint, minWidth, maxWidth } = (0, use_breakpoint_1.useBreakpoint)(utils_1.breakpoints);
    const { isMobile, isTablet, isDesktop } = (0, react_1.useMemo)(() => {
        return {
            isMobile: breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md",
            isTablet: breakpoint === "sm" || breakpoint === "md",
            isDesktop: breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl",
        };
    }, [breakpoint]);
    return {
        breakpoint,
        minWidth,
        maxWidth,
        isMobile,
        isTablet,
        isDesktop,
        devicePixelRatio: window.devicePixelRatio,
    };
};
exports.useBreakpoint = useBreakpoint;
