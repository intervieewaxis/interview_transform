"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SheetDescription = exports.SheetTitle = exports.SheetFooter = exports.SheetHeader = exports.SheetContent = exports.SheetOverlay = exports.SheetPortal = exports.SheetClose = exports.SheetTrigger = exports.Sheet = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@phosphor-icons/react");
const SheetPrimitive = __importStar(require("@radix-ui/react-dialog"));
const utils_1 = require("@reactive-resume/utils");
const react_2 = require("react");
const sheet_1 = require("../variants/sheet");
exports.Sheet = SheetPrimitive.Root;
exports.SheetTrigger = SheetPrimitive.Trigger;
exports.SheetClose = SheetPrimitive.Close;
const SheetPortal = (props) => ((0, jsx_runtime_1.jsx)(SheetPrimitive.Portal, Object.assign({}, props)));
exports.SheetPortal = SheetPortal;
exports.SheetPortal.displayName = SheetPrimitive.Portal.displayName;
exports.SheetOverlay = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(SheetPrimitive.Overlay, Object.assign({ className: (0, utils_1.cn)("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className) }, props, { ref: ref })));
});
exports.SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
exports.SheetContent = (0, react_2.forwardRef)((_a, ref) => {
    var { side = "right", className, children, showClose = true } = _a, props = __rest(_a, ["side", "className", "children", "showClose"]);
    return ((0, jsx_runtime_1.jsxs)(exports.SheetPortal, { children: [(0, jsx_runtime_1.jsx)(exports.SheetOverlay, {}), (0, jsx_runtime_1.jsxs)(SheetPrimitive.Content, Object.assign({ ref: ref, className: (0, utils_1.cn)((0, sheet_1.sheetVariants)({ side }), className) }, props, { children: [children, showClose && ((0, jsx_runtime_1.jsxs)(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [(0, jsx_runtime_1.jsx)(react_1.X, { className: "size-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Close" })] }))] }))] }));
});
exports.SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, utils_1.cn)("flex flex-col space-y-2 text-center sm:text-left", className) }, props)));
};
exports.SheetHeader = SheetHeader;
exports.SheetHeader.displayName = "SheetHeader";
const SheetFooter = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, utils_1.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className) }, props)));
};
exports.SheetFooter = SheetFooter;
exports.SheetFooter.displayName = "SheetFooter";
exports.SheetTitle = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(SheetPrimitive.Title, Object.assign({ ref: ref, className: (0, utils_1.cn)("text-base font-medium text-foreground", className) }, props)));
});
exports.SheetTitle.displayName = SheetPrimitive.Title.displayName;
exports.SheetDescription = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(SheetPrimitive.Description, Object.assign({ ref: ref, className: (0, utils_1.cn)("opacity-60", className) }, props)));
});
exports.SheetDescription.displayName = SheetPrimitive.Description.displayName;
