"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.RichInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const zod_1 = require("@hookform/resolvers/zod");
const react_1 = require("@phosphor-icons/react");
const react_popover_1 = require("@radix-ui/react-popover");
const utils_1 = require("@reactive-resume/utils");
const extension_highlight_1 = require("@tiptap/extension-highlight");
const extension_image_1 = require("@tiptap/extension-image");
const extension_link_1 = require("@tiptap/extension-link");
const extension_text_align_1 = require("@tiptap/extension-text-align");
const extension_underline_1 = require("@tiptap/extension-underline");
const react_2 = require("@tiptap/react");
const starter_kit_1 = require("@tiptap/starter-kit");
const react_3 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const button_1 = require("./button");
const form_1 = require("./form");
const input_1 = require("./input");
const popover_1 = require("./popover");
const skeleton_1 = require("./skeleton");
const toggle_1 = require("./toggle");
const tooltip_1 = require("./tooltip");
const InsertImageFormSchema = zod_2.z.object({
    src: zod_2.z.string(),
    alt: zod_2.z.string().optional(),
});
const InsertImageForm = ({ onInsert }) => {
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(InsertImageFormSchema),
        defaultValues: { src: "", alt: "" },
    });
    const onSubmit = (values) => {
        onInsert(values);
        form.reset();
    };
    return ((0, jsx_runtime_1.jsx)(form_1.Form, Object.assign({}, form, { children: (0, jsx_runtime_1.jsxs)("form", { className: "space-y-3", onSubmit: (event) => __awaiter(void 0, void 0, void 0, function* () {
                event.stopPropagation();
                event.preventDefault();
                yield form.handleSubmit(onSubmit)();
            }), children: [(0, jsx_runtime_1.jsx)("p", { className: "prose prose-sm prose-zinc dark:prose-invert", children: "Insert an image from an external URL and use it on your resume." }), (0, jsx_runtime_1.jsx)(form_1.FormField, { name: "src", control: form.control, render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "URL" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ placeholder: "https://..." }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] })) }), (0, jsx_runtime_1.jsx)(form_1.FormField, { name: "alt", control: form.control, render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Description" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({}, field)) })] })) }), (0, jsx_runtime_1.jsx)("div", { className: "!mt-5 ml-auto max-w-fit", children: (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", variant: "secondary", size: "sm", children: "Insert Image" }) })] }) })));
};
const Toolbar = ({ editor }) => {
    const setLink = (0, react_3.useCallback)(() => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);
        // cancelled
        if (url === null) {
            return;
        }
        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        // update link
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-0.5 border p-1", children: [(0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Bold", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("bold"), disabled: !editor.can().chain().toggleBold().run(), onPressedChange: () => editor.chain().focus().toggleBold().run(), children: (0, jsx_runtime_1.jsx)(react_1.TextB, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Italic", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("italic"), disabled: !editor.can().chain().focus().toggleItalic().run(), onPressedChange: () => editor.chain().focus().toggleItalic().run(), children: (0, jsx_runtime_1.jsx)(react_1.TextItalic, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Strikethrough", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("strike"), disabled: !editor.can().chain().focus().toggleStrike().run(), onPressedChange: () => editor.chain().focus().toggleStrike().run(), children: (0, jsx_runtime_1.jsx)(react_1.TextStrikethrough, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Underline", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("underline"), disabled: !editor.can().chain().focus().toggleUnderline().run(), onPressedChange: () => editor.chain().focus().toggleUnderline().run(), children: (0, jsx_runtime_1.jsx)(react_1.TextAUnderline, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Highlight", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("highlight"), disabled: !editor.can().chain().focus().toggleHighlight().run(), onPressedChange: () => editor.chain().focus().toggleHighlight().run(), children: (0, jsx_runtime_1.jsx)(react_1.HighlighterCircle, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Hyperlink", children: (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", size: "sm", variant: "ghost", className: "px-2", onClick: setLink, children: (0, jsx_runtime_1.jsx)(react_1.LinkSimple, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Inline Code", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("code"), disabled: !editor.can().chain().focus().toggleCode().run(), onPressedChange: () => editor.chain().focus().toggleCode().run(), children: (0, jsx_runtime_1.jsx)(react_1.Code, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Code Block", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("codeBlock"), disabled: !editor.can().chain().focus().toggleCodeBlock().run(), onPressedChange: () => editor.chain().focus().toggleCodeBlock().run(), children: (0, jsx_runtime_1.jsx)(react_1.CodeBlock, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Heading 1", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("heading", { level: 1 }), disabled: !editor.can().chain().focus().toggleHeading({ level: 1 }).run(), onPressedChange: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), children: (0, jsx_runtime_1.jsx)(react_1.TextHOne, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Heading 2", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("heading", { level: 2 }), disabled: !editor.can().chain().focus().toggleHeading({ level: 2 }).run(), onPressedChange: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), children: (0, jsx_runtime_1.jsx)(react_1.TextHTwo, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Heading 3", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("heading", { level: 3 }), disabled: !editor.can().chain().focus().toggleHeading({ level: 3 }).run(), onPressedChange: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), children: (0, jsx_runtime_1.jsx)(react_1.TextHThree, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Paragraph", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("paragraph"), onPressedChange: () => editor.chain().focus().setParagraph().run(), children: (0, jsx_runtime_1.jsx)(react_1.Paragraph, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Align Left", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive({ textAlign: "left" }), disabled: !editor.can().chain().focus().setTextAlign("left").run(), onPressedChange: () => editor.chain().focus().setTextAlign("left").run(), children: (0, jsx_runtime_1.jsx)(react_1.TextAlignLeft, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Align Center", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive({ textAlign: "center" }), disabled: !editor.can().chain().focus().setTextAlign("center").run(), onPressedChange: () => editor.chain().focus().setTextAlign("center").run(), children: (0, jsx_runtime_1.jsx)(react_1.TextAlignCenter, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Align Right", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive({ textAlign: "right" }), disabled: !editor.can().chain().focus().setTextAlign("right").run(), onPressedChange: () => editor.chain().focus().setTextAlign("right").run(), children: (0, jsx_runtime_1.jsx)(react_1.TextAlignRight, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Align Justify", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive({ textAlign: "justify" }), disabled: !editor.can().chain().focus().setTextAlign("justify").run(), onPressedChange: () => editor.chain().focus().setTextAlign("justify").run(), children: (0, jsx_runtime_1.jsx)(react_1.TextAlignJustify, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Bullet List", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("bulletList"), disabled: !editor.can().chain().focus().toggleBulletList().run(), onPressedChange: () => editor.chain().focus().toggleBulletList().run(), children: (0, jsx_runtime_1.jsx)(react_1.ListBullets, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Numbered List", children: (0, jsx_runtime_1.jsx)(toggle_1.Toggle, { size: "sm", type: "button", pressed: editor.isActive("orderedList"), disabled: !editor.can().chain().focus().toggleOrderedList().run(), onPressedChange: () => editor.chain().focus().toggleOrderedList().run(), children: (0, jsx_runtime_1.jsx)(react_1.ListNumbers, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Outdent", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", type: "button", variant: "ghost", className: "px-2", disabled: !editor.can().chain().focus().liftListItem("listItem").run(), onClick: () => editor.chain().focus().liftListItem("listItem").run(), children: (0, jsx_runtime_1.jsx)(react_1.TextOutdent, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Indent", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", type: "button", variant: "ghost", className: "px-2", disabled: !editor.can().chain().focus().sinkListItem("listItem").run(), onClick: () => editor.chain().focus().sinkListItem("listItem").run(), children: (0, jsx_runtime_1.jsx)(react_1.TextIndent, {}) }) }), (0, jsx_runtime_1.jsxs)(popover_1.Popover, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Insert Image", children: (0, jsx_runtime_1.jsx)(react_popover_1.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", size: "sm", variant: "ghost", className: "px-2", children: (0, jsx_runtime_1.jsx)(react_1.Image, {}) }) }) }), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { className: "w-80", children: (0, jsx_runtime_1.jsx)(InsertImageForm, { onInsert: (props) => editor.chain().focus().setImage(props).run() }) })] }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Insert Break Line", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", type: "button", variant: "ghost", className: "px-2", disabled: !editor.can().chain().focus().setHardBreak().run(), onClick: () => editor.chain().focus().setHardBreak().run(), children: (0, jsx_runtime_1.jsx)(react_1.KeyReturn, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Insert Horizontal Rule", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", type: "button", variant: "ghost", className: "px-2", disabled: !editor.can().chain().focus().setHorizontalRule().run(), onClick: () => editor.chain().focus().setHorizontalRule().run(), children: (0, jsx_runtime_1.jsx)(react_1.Minus, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Undo", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", type: "button", variant: "ghost", className: "px-2", disabled: !editor.can().undo(), onClick: () => editor.chain().focus().undo().run(), children: (0, jsx_runtime_1.jsx)(react_1.ArrowCounterClockwise, {}) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { content: "Redo", children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", type: "button", variant: "ghost", className: "px-2", disabled: !editor.can().redo(), onClick: () => editor.chain().focus().redo().run(), children: (0, jsx_runtime_1.jsx)(react_1.ArrowClockwise, {}) }) })] }));
};
exports.RichInput = (0, react_3.forwardRef)((_a, _ref) => {
    var { content, onChange, footer, hideToolbar = false, className, editorClassName } = _a, props = __rest(_a, ["content", "onChange", "footer", "hideToolbar", "className", "editorClassName"]);
    const editor = (0, react_2.useEditor)({
        extensions: [
            starter_kit_1.StarterKit,
            extension_image_1.Image,
            extension_underline_1.Underline,
            extension_highlight_1.Highlight,
            extension_text_align_1.TextAlign.configure({ types: ["heading", "paragraph"] }),
            extension_link_1.Link.extend({ inclusive: false }).configure({ openOnClick: false }),
        ],
        editorProps: {
            attributes: {
                class: (0, utils_1.cn)("prose prose-sm prose-zinc max-h-[200px] max-w-none overflow-y-scroll dark:prose-invert focus:outline-none [&_*]:my-2", editorClassName),
            },
        },
        content,
        parseOptions: { preserveWhitespace: "full" },
        onUpdate: ({ editor }) => onChange === null || onChange === void 0 ? void 0 : onChange(editor.getHTML()),
    });
    if (!editor) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: (0, utils_1.cn)("h-[42px] w-full", hideToolbar && "hidden") }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[90px] w-full" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [!hideToolbar && (0, jsx_runtime_1.jsx)(Toolbar, { editor: editor }), (0, jsx_runtime_1.jsx)(react_2.EditorContent, Object.assign({ editor: editor, className: (0, utils_1.cn)("grid min-h-[160px] w-full rounded-sm border bg-transparent px-3 py-2 text-sm placeholder:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50", hideToolbar && "pt-2", className) }, props)), footer === null || footer === void 0 ? void 0 : footer(editor)] }));
});
exports.RichInput.displayName = "RichInput";
