"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = void 0;
const react_1 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";
const useTheme = () => {
    const isDarkOS = (0, usehooks_ts_1.useMediaQuery)(COLOR_SCHEME_QUERY);
    const [isDarkMode, setDarkMode] = (0, react_1.useState)(isDarkOS);
    const [theme, setTheme] = (0, usehooks_ts_1.useLocalStorage)("theme", "system");
    (0, react_1.useEffect)(() => {
        if (theme === "system")
            setDarkMode((prev) => !prev);
    }, [theme]);
    (0, react_1.useEffect)(() => {
        switch (theme) {
            case "light": {
                setDarkMode(false);
                break;
            }
            case "system": {
                setDarkMode(isDarkOS);
                break;
            }
            case "dark": {
                setDarkMode(true);
                break;
            }
        }
    }, [theme, isDarkOS]);
    function toggleTheme() {
        const toggleDict = {
            light: "system",
            system: "dark",
            dark: "light",
        };
        setTheme((prevMode) => toggleDict[prevMode]);
    }
    return {
        theme,
        setTheme,
        isDarkMode,
        toggleTheme,
    };
};
exports.useTheme = useTheme;
