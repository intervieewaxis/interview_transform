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
exports.ToastDescription = exports.ToastTitle = exports.ToastClose = exports.ToastAction = exports.Toast = exports.ToastViewport = exports.ToastProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@phosphor-icons/react");
const ToastPrimitives = __importStar(require("@radix-ui/react-toast"));
const utils_1 = require("@reactive-resume/utils");
const react_2 = require("react");
const toast_1 = require("../variants/toast");
exports.ToastProvider = ToastPrimitives.Provider;
exports.ToastViewport = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(ToastPrimitives.Viewport, Object.assign({ ref: ref, className: (0, utils_1.cn)("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className) }, props)));
});
exports.ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
exports.Toast = (0, react_2.forwardRef)((_a, ref) => {
    var { className, variant } = _a, props = __rest(_a, ["className", "variant"]);
    return ((0, jsx_runtime_1.jsx)(ToastPrimitives.Root, Object.assign({ ref: ref, className: (0, utils_1.cn)((0, toast_1.toastVariants)({ variant }), className) }, props)));
});
exports.Toast.displayName = ToastPrimitives.Root.displayName;
exports.ToastAction = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(ToastPrimitives.Action, Object.assign({ ref: ref, className: (0, utils_1.cn)("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-primary disabled:pointer-events-none disabled:opacity-50", "group/primary:border-border/40 group-hover/primary:border-primary/30 group-hover/primary:bg-primary group-hover/primary:text-primary-foreground group-focus/primary:ring-primary", "group/secondary:border-border/40 group-hover/secondary:border-secondary/30 group-hover/secondary:bg-secondary group-hover/secondary:text-secondary-foreground group-focus/secondary:ring-secondary", "group/error:border-border/40 group-hover/error:border-error/30 group-hover/error:bg-error group-hover/error:text-error-foreground group-focus/error:ring-error", "group/warning:border-border/40 group-hover/warning:border-warning/30 group-hover/warning:bg-warning group-hover/warning:text-warning-foreground group-focus/warning:ring-warning", "group/info:border-border/40 group-hover/info:border-info/30 group-hover/info:bg-info group-hover/info:text-info-foreground group-focus/info:ring-info", "group/success:border-border/40 group-hover/success:border-success/30 group-hover/success:bg-success group-hover/success:text-success-foreground group-focus/success:ring-success", className) }, props)));
});
exports.ToastAction.displayName = ToastPrimitives.Action.displayName;
exports.ToastClose = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(ToastPrimitives.Close, Object.assign({ ref: ref, className: (0, utils_1.cn)("absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100", "group/primary:text-primary group-hover/primary:text-primary-foreground group-focus/primary:ring-primary group-focus/primary:ring-offset-primary", "group/secondary:text-secondary group-hover/secondary:text-secondary-foreground group-focus/secondary:ring-secondary group-focus/secondary:ring-offset-secondary", "group/error:text-error group-hover/error:text-error-foreground group-focus/error:ring-error group-focus/error:ring-offset-error", "group/warning:text-warning group-hover/warning:text-warning-foreground group-focus/warning:ring-warning group-focus/warning:ring-offset-warning", "group/info:text-info group-hover/info:text-info-foreground group-focus/info:ring-info group-focus/info:ring-offset-info", "group/success:text-success group-hover/success:text-success-foreground group-focus/success:ring-success group-focus/success:ring-offset-success", className), "toast-close": "" }, props, { children: (0, jsx_runtime_1.jsx)(react_1.X, { className: "size-4" }) })));
});
exports.ToastClose.displayName = ToastPrimitives.Close.displayName;
exports.ToastTitle = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(ToastPrimitives.Title, Object.assign({ ref: ref, className: (0, utils_1.cn)("text-sm font-semibold [&+div]:text-xs", className) }, props)));
});
exports.ToastTitle.displayName = ToastPrimitives.Title.displayName;
exports.ToastDescription = (0, react_2.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(ToastPrimitives.Description, Object.assign({ ref: ref, className: (0, utils_1.cn)("line-clamp-2 text-sm opacity-90", className) }, props)));
});
exports.ToastDescription.displayName = ToastPrimitives.Description.displayName;
