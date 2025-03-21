"use strict";
/// <reference types='vitest' />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const nx_tsconfig_paths_plugin_1 = require("@nx/vite/plugins/nx-tsconfig-paths.plugin");
const plugin_react_swc_1 = __importDefault(require("@vitejs/plugin-react-swc"));
const vite_1 = require("vite");
const vite_plugin_dts_1 = __importDefault(require("vite-plugin-dts"));
exports.default = (0, vite_1.defineConfig)({
    cacheDir: "../../node_modules/.vite/hooks",
    plugins: [
        (0, plugin_react_swc_1.default)(),
        (0, nx_tsconfig_paths_plugin_1.nxViteTsPaths)(),
        (0, vite_plugin_dts_1.default)({
            entryRoot: "src",
            tsconfigPath: node_path_1.default.join(import.meta.dirname, "tsconfig.lib.json"),
        }),
    ],
    build: {
        emptyOutDir: true,
        lib: {
            entry: "src/index.ts",
            name: "hooks",
            fileName: "index",
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: [/^react.*/, "react-hook-form", "use-breakpoint", "usehooks-ts"],
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
});
