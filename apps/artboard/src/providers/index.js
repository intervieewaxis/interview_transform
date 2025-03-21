"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Providers = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_1 = require("react-router");
const artboard_1 = require("../store/artboard");
const Providers = () => {
    const resume = (0, artboard_1.useArtboardStore)((state) => state.resume);
    const setResume = (0, artboard_1.useArtboardStore)((state) => state.setResume);
    (0, react_1.useEffect)(() => {
        const handleMessage = (event) => {
            if (event.origin !== window.location.origin)
                return;
            if (event.data.type === "SET_RESUME")
                setResume(event.data.payload);
            if (event.data.type === "SET_THEME") {
                event.data.payload === "dark"
                    ? document.documentElement.classList.add("dark")
                    : document.documentElement.classList.remove("dark");
            }
        };
        const resumeData = window.localStorage.getItem("resume");
        if (resumeData) {
            setResume(JSON.parse(resumeData));
            return;
        }
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [setResume]);
    // Only for testing, in production this will be fetched from window.postMessage
    // useEffect(() => {
    //   setResume(sampleResume);
    // }, [setResume]);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!resume)
        return null;
    return (0, jsx_runtime_1.jsx)(react_router_1.Outlet, {});
};
exports.Providers = Providers;
