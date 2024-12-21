"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import HardBreak from "@tiptap/extension-hard-break";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import BubbleMenuBar from "./bubble-menu";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";

// custom
import Callout from "./extensions/callout";
import Placeholder from "@tiptap/extension-placeholder";

interface TiptapProps {
  onEditorReady?: (editor: Editor) => void;
  content?: string;
}

const Tiptap = ({ onEditorReady, content }: TiptapProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    // shouldRerenderOnTransaction: false,
    extensions: [
      Placeholder.configure({
        placeholder: 'Write something...',
        emptyEditorClass: 'is-editor-empty',
      }),
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: "mb-3 text-base",
        },
      }),
      Text,
      History,
      HardBreak,
      Bold.configure({
        HTMLAttributes: {
          class: "font-bold",
        },
      }),
      Italic.configure({
        HTMLAttributes: {
          class: "italic",
        },
      }),
      Strike.configure({
        HTMLAttributes: {
          class: "line-through",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        HTMLAttributes: {
          class: `cursor-text rounded-sm bg-link-background px-1.5 py-0.5 transition-colors
          text-sm text-link-foreground font-medium underline underline-offset-2
          `,
          rel: "noopener noreferrer nofollow",
        },
        validate: (url) => /^https?:\/\//.test(url),
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "rounded-md bg-muted p-4 my-2 font-mono",
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-200 dark:bg-yellow-800",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-6 mb-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-6 mb-4",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "mb-1",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      CharacterCount,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "mt-2 border-l-2 border-border pl-6",
        },
      }),
      Callout,
    ],
    onBeforeCreate({ editor }) {
      onEditorReady?.(editor);
    },
    content: content,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      {editor && <BubbleMenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
