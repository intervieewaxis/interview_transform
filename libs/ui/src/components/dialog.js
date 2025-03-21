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
exports.DialogDescription = exports.DialogTitle = exports.DialogFooter = exports.DialogHeader = exports.DialogContent = exports.DialogOverlay = exports.DialogPortal = exports.DialogTrigger = exports.Dialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@phosphor-icons/react");
const DialogPrimitive = __importStar(require("@radix-ui/react-dialog"));
const utils_1 = require("@reactive-resume/utils");
const react_2 = require("react");
exports.Dialog = DialogPrimitive.Root;
exports.DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = (props) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Portal, Object.assign({}, props)));
exports.DialogPortal = DialogPortal;
exports.DialogPortal.displayName = DialogPrimitive.Portal.displayName;
exports.DialogOverlay = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(DialogPrimitive.Overlay, Object.assign({ ref: ref, className: (0, utils_1.cn)("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className) }, props)));
});
exports.DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
exports.DialogContent = (0, react_2.forwardRef)((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsxs)(exports.DialogPortal, { children: [(0, jsx_runtime_1.jsx)(exports.DialogOverlay, {}), (0, jsx_runtime_1.jsxs)(DialogPrimitive.Content, Object.assign({ ref: ref, className: (0, utils_1.cn)("fixed left-1/2 top-1/2 z-50 grid w-full max-w-sm -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 duration-200 focus:outline-none focus:ring-1 focus:ring-secondary focus:ring-offset-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-xl sm:rounded-sm md:w-full", className) }, props, { children: [children, (0, jsx_runtime_1.jsxs)(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground", children: [(0, jsx_runtime_1.jsx)(react_1.X, { className: "size-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Close" })] })] }))] }));
});
exports.DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, utils_1.cn)("flex flex-col space-y-3 text-left", className) }, props)));
};
exports.DialogHeader = DialogHeader;
exports.DialogHeader.displayName = "DialogHeader";
const DialogFooter = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, utils_1.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3", className) }, props)));
};
exports.DialogFooter = DialogFooter;
exports.DialogFooter.displayName = "DialogFooter";
exports.DialogTitle = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(DialogPrimitive.Title, Object.assign({ ref: ref, className: (0, utils_1.cn)("text-base font-semibold leading-none tracking-tight", className) }, props)));
});
exports.DialogTitle.displayName = DialogPrimitive.Title.displayName;
exports.DialogDescription = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(DialogPrimitive.Description, Object.assign({ ref: ref, className: (0, utils_1.cn)("text-sm leading-relaxed text-primary-accent", className) }, props)));
});
exports.DialogDescription.displayName = DialogPrimitive.Description.displayName;
