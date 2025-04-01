import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  type ReactNode,
  type Ref,
} from "react";
import { Link } from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
  EditorContent,
  useEditor,
  useEditorState,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  Redo2Icon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolbarToggleProps {
  children: ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
}

const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
  }),
];

const ToolbarToggle = memo(
  forwardRef(function ToolbarToggle(
    { children, label, isActive, ...props }: ToolbarToggleProps,
    ref: Ref<HTMLButtonElement>,
  ) {
    return (
      <button
        ref={ref}
        aria-label={label}
        className={cn(
          "text-opacity-70 flex size-6 items-center justify-center rounded text-gray-900 transition-colors duration-100 ease-in-out [&>svg]:size-4",
          "data-[active=true]:text-opacity-100 hover:bg-gray-100 data-[active=true]:bg-gray-200",
          "disabled:text-gray-300",
        )}
        data-active={isActive}
        type="button"
        {...props}
      >
        {children}
      </button>
    );
  }),
  // Only checks isActive or disabled for re-rendering, the rest are static so it can be ignored.
  (prevProps, nextProps) =>
    prevProps.isActive === nextProps.isActive &&
    prevProps.disabled === nextProps.disabled,
);

export default ToolbarToggle;

function TextFormatterControlGroup({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold"),
      isItalic: ctx.editor?.isActive("italic"),
      isUnderline: ctx.editor?.isActive("underline"),
      isStrike: ctx.editor?.isActive("strike"),
    }),
  });

  return (
    <div>
      <ToolbarToggle
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editorState.isBold}
        label="bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon />
      </ToolbarToggle>
      <ToolbarToggle
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editorState.isItalic}
        label="italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon />
      </ToolbarToggle>
      <ToolbarToggle
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        isActive={editorState.isUnderline}
        label="underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon />
      </ToolbarToggle>
      <ToolbarToggle
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editorState.isStrike}
        label="strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon />
      </ToolbarToggle>
    </div>
  );
}

function HeadingControlGroup({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isFirstHeadingActive: ctx.editor?.isActive("heading", { level: 1 }),
      isSecondHeadingActive: ctx.editor?.isActive("heading", { level: 2 }),
      isThirdHeadingActive: ctx.editor?.isActive("heading", { level: 3 }),
    }),
  });

  return (
    <div>
      <ToolbarToggle
        isActive={editorState.isFirstHeadingActive}
        label="h1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1Icon />
      </ToolbarToggle>
      <ToolbarToggle
        isActive={editorState.isSecondHeadingActive}
        label="h2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2Icon />
      </ToolbarToggle>
      <ToolbarToggle
        isActive={editorState.isThirdHeadingActive}
        label="h3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3Icon />
      </ToolbarToggle>
    </div>
  );
}

function AlignmentControlGroup({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isLeftAlignActive: ctx.editor?.isActive({ textAlign: "left" }),
      isCenterAlignActive: ctx.editor?.isActive({ textAlign: "center" }),
      isRightAlignActive: ctx.editor?.isActive({ textAlign: "right" }),
      isLeftAlignDisabled: !editor
        .can()
        .chain()
        .focus()
        .setTextAlign("left")
        .run(),
      isCenterAlignDisabled: !editor
        .can()
        .chain()
        .focus()
        .setTextAlign("center")
        .run(),
      isRightAlignDisabled: !editor
        .can()
        .chain()
        .focus()
        .setTextAlign("right")
        .run(),
    }),
  });

  return (
    <div>
      <ToolbarToggle
        disabled={editorState.isLeftAlignDisabled}
        isActive={editorState.isLeftAlignActive}
        label="Align Left"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeftIcon />
      </ToolbarToggle>
      <ToolbarToggle
        disabled={editorState.isCenterAlignDisabled}
        isActive={editorState.isCenterAlignActive}
        label="Align Center"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenterIcon />
      </ToolbarToggle>
      <ToolbarToggle
        disabled={editorState.isRightAlignDisabled}
        isActive={editorState.isRightAlignActive}
        label="Align Right"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRightIcon />
      </ToolbarToggle>
    </div>
  );
}

function ListControlGroup({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBulletListActive: ctx.editor?.isActive("bulletList"),
      isOrderedListActive: ctx.editor?.isActive("orderedList"),
      isLinkActive: ctx.editor?.isActive("link"),
    }),
  });

  const toggleLink = useCallback(() => {
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

  return (
    <div>
      <ToolbarToggle
        isActive={editorState.isBulletListActive}
        label="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon />
      </ToolbarToggle>
      <ToolbarToggle
        isActive={editorState.isOrderedListActive}
        label="Ordered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon />
      </ToolbarToggle>
      <ToolbarToggle
        isActive={editorState.isLinkActive}
        label="Link"
        onClick={toggleLink}
      >
        <LinkIcon />
      </ToolbarToggle>
    </div>
  );
}

function HistoryControlGroup({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isUndoActive: ctx.editor?.isActive("undo"),
      isRedoActive: ctx.editor?.isActive("redo"),
      isUndoDisabled: !ctx.editor?.can().chain().focus().undo().run(),
      isRedoDisabled: !ctx.editor?.can().chain().focus().redo().run(),
    }),
  });

  return (
    <div>
      <ToolbarToggle
        disabled={editorState.isUndoDisabled}
        isActive={editorState.isUndoActive}
        label="Undo"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2Icon />
      </ToolbarToggle>
      <ToolbarToggle
        disabled={editorState.isRedoDisabled}
        isActive={editorState.isRedoActive}
        label="Redo"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2Icon />
      </ToolbarToggle>
    </div>
  );
}

function RichTextEditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return;

  return (
    <div className="top-20 z-20 flex h-12 items-center divide-x divide-gray-300 overflow-x-auto rounded-t-lg border-b border-b-gray-300 bg-white px-4 py-2 [&>:last-child]:ml-auto [&>:not(:first-child)]:pl-4 [&>div]:flex [&>div]:items-center [&>div]:gap-x-4 [&>div]:pr-4">
      <HeadingControlGroup editor={editor} />
      <TextFormatterControlGroup editor={editor} />
      <AlignmentControlGroup editor={editor} />
      <ListControlGroup editor={editor} />
      <HistoryControlGroup editor={editor} />
    </div>
  );
}

interface RichTextEditorProps {
  /**
   * The initial content of the editor as an HTML string.
   * This can be used to prepopulate the editor with existing HTML content.
   */
  content?: string | null;

  /**
   * Callback function that is triggered whenever the content in the editor changes.
   * Receives the updated content as an HTML string.
   *
   * @param htmlString - The updated content of the editor in HTML format.
   */
  onChange?: (htmlString: string) => void;

  /**
   * Optional class names for custom styling of components.
   */
  classNames?: {
    wrapper?: string; // Custom class for the container element.
  };
}

function RichTextEditor({
  content,
  onChange,
  classNames,
}: RichTextEditorProps) {
  const editor = useEditor({
    content,
    extensions,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose focus:outline-none prose-slate max-w-full p-4 bg-white rounded-b-lg h-full",
      },
    },
  });

  useEffect(() => {
    if (
      editor &&
      content !== null &&
      content !== undefined &&
      editor.getHTML() !== content
    ) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div
      className={cn(
        "relative flex h-full min-h-72 flex-col rounded-lg border border-gray-300",
        classNames?.wrapper,
      )}
    >
      <RichTextEditorToolbar editor={editor} />
      <EditorContent className="grow" editor={editor} />
    </div>
  );
}

export { RichTextEditor };
