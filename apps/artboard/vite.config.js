"use strict";
/// <reference types='vitest' />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nx_tsconfig_paths_plugin_1 = require("@nx/vite/plugins/nx-tsconfig-paths.plugin");
const plugin_react_swc_1 = __importDefault(require("@vitejs/plugin-react-swc"));
const vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    base: "/artboard/",
    cacheDir: "../../node_modules/.vite/artboard",
    build: {
        sourcemap: true,
        emptyOutDir: true,
    },
    server: {
        host: true,
        port: 6173,
        fs: { allow: [(0, vite_1.searchForWorkspaceRoot)(process.cwd())] },
    },
    plugins: [(0, plugin_react_swc_1.default)(), (0, nx_tsconfig_paths_plugin_1.nxViteTsPaths)()],
    resolve: {
        alias: {
            "@/artboard/": `${(0, vite_1.searchForWorkspaceRoot)(process.cwd())}/apps/artboard/src/`,
        },
    },
});
