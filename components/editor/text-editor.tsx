"use client";

import EditorToolbar from "@/components/editor/toolbar";
import Tiptap from "./tiptap";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { defaultEditorContent } from "@/lib/placeholder-content";

export default function TiptapEditor() {
  const [editor, setEditor] = useState<Editor | null>(null);

  return (
    <div className="bg-muted min-h-screen pt-[57px] overflow-y-auto">
      <EditorToolbar editor={editor} />
      <div className="max-w-4xl mx-auto py-8">
        <div className="min-h-[1100px] bg-background rounded-lg border py-12 px-8">
          <Tiptap onEditorReady={setEditor} content={defaultEditorContent} />
        </div>
      </div>
    </div>
  );
}
