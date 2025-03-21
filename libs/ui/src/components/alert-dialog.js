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
exports.AlertDialogCancel = exports.AlertDialogAction = exports.AlertDialogDescription = exports.AlertDialogTitle = exports.AlertDialogFooter = exports.AlertDialogHeader = exports.AlertDialogContent = exports.AlertDialogOverlay = exports.AlertDialogPortal = exports.AlertDialogTrigger = exports.AlertDialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const AlertDialogPrimitive = __importStar(require("@radix-ui/react-alert-dialog"));
const utils_1 = require("@reactive-resume/utils");
const react_1 = require("react");
const button_1 = require("../variants/button");
exports.AlertDialog = AlertDialogPrimitive.Root;
exports.AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = (props) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Portal, Object.assign({}, props)));
exports.AlertDialogPortal = AlertDialogPortal;
exports.AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName;
exports.AlertDialogOverlay = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Overlay, Object.assign({ className: (0, utils_1.cn)("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className) }, props, { ref: ref })));
});
exports.AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
exports.AlertDialogContent = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsxs)(exports.AlertDialogPortal, { children: [(0, jsx_runtime_1.jsx)(exports.AlertDialogOverlay, {}), (0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Content, Object.assign({ ref: ref, className: (0, utils_1.cn)("fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded border bg-background p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] md:w-full", className) }, props))] }));
});
exports.AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, utils_1.cn)("flex flex-col space-y-2 text-center sm:text-left", className) }, props)));
};
exports.AlertDialogHeader = AlertDialogHeader;
exports.AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, utils_1.cn)("mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4", className) }, props)));
};
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogFooter.displayName = "AlertDialogFooter";
exports.AlertDialogTitle = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Title, Object.assign({ ref: ref, className: (0, utils_1.cn)("text-base font-medium", className) }, props)));
});
exports.AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
exports.AlertDialogDescription = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Description, Object.assign({ ref: ref, className: (0, utils_1.cn)("text-sm leading-relaxed", className) }, props)));
});
exports.AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
exports.AlertDialogAction = (0, react_1.forwardRef)((_a, ref) => {
    var { className, variant } = _a, props = __rest(_a, ["className", "variant"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Action, Object.assign({ ref: ref, className: (0, utils_1.cn)((0, button_1.buttonVariants)({ variant }), className) }, props)));
});
exports.AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
exports.AlertDialogCancel = (0, react_1.forwardRef)((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Cancel, Object.assign({ ref: ref, className: (0, utils_1.cn)((0, button_1.buttonVariants)({ variant: "outline" }), "mt-2 sm:mt-0", className) }, props)));
});
exports.AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
