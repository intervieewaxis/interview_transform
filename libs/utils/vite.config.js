"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nx_tsconfig_paths_plugin_1 = require("@nx/vite/plugins/nx-tsconfig-paths.plugin");
const vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    cacheDir: "../../node_modules/.vite/utils",
    plugins: [(0, nx_tsconfig_paths_plugin_1.nxViteTsPaths)()],
    test: {
        globals: true,
        environment: "jsdom",
        include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
});
