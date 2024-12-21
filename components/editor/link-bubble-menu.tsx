"use client";

import { BubbleMenu, Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface LinkBubbleMenuProps {
  editor: Editor;
}

export default function LinkBubbleMenu({ editor }: LinkBubbleMenuProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
        rel: "noopener noreferrer nofollow",
      })
      .run();
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <BubbleMenu
      className="flex justify-center items-center gap-0.5 p-0.5 h-fit w-fit overflow-hidden rounded-lg border bg-background shadow-md"
      tippyOptions={{
        duration: 100,
        hideOnClick: false,
      }}
      editor={editor}
      shouldShow={({ editor }) => {
        if (editor.isActive("link")) {
          const linkAttrs = editor.getAttributes("link");
          setUrl(linkAttrs.href || "");
          return true;
        }
        return false;
      }}
    >
      <Button
        variant="link"
        size="sm"
        onClick={() => window.open(url, "_blank")}
      >
        <ExternalLink className="h-4 w-4" />
        Open
      </Button>

      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-8 w-[200px]"
          placeholder="https://example.com"
        />
      </form>

      <Button variant="ghost" size="sm" onClick={unsetLink} className="px-2">
        <Trash2 className="h-4 w-4" />
      </Button>
    </BubbleMenu>
  );
}
