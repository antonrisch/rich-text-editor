"use client";

import { BubbleMenu, Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import LinkBubbleMenu from "./link-bubble-menu";

interface BubbleMenuBarProps {
  editor: Editor;
}

interface FormatButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
  tooltip: string;
}

function FormatButton({ onClick, isActive, icon, tooltip }: FormatButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
          className={cn(isActive && "bg-accent")}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8}>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function BubbleMenuBar({ editor }: BubbleMenuBarProps) {
  const formatButtons = [
    {
      icon: <Bold className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      tooltip: "Bold",
    },
    {
      icon: <Italic className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      tooltip: "Italic",
    },
    {
      icon: <Underline className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      tooltip: "Underline",
    },
    {
      icon: <Strikethrough className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      tooltip: "Strikethrough",
    },
    {
      icon: <Highlighter className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: editor.isActive("highlight"),
      tooltip: "Highlight",
    },
  ];

  const alignmentButtons = [
    {
      icon: <AlignLeft className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
      tooltip: "Align Left",
    },
    {
      icon: <AlignCenter className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
      tooltip: "Center",
    },
    {
      icon: <AlignRight className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
      tooltip: "Align Right",
    },
    {
      icon: <AlignJustify className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: editor.isActive({ textAlign: "justify" }),
      tooltip: "Justify",
    },
  ];

  return (
    <>
      <BubbleMenu
        className="flex justify-center items-center gap-1 p-0.5 h-fit w-fit overflow-hidden rounded-lg border bg-background shadow-md"
        tippyOptions={{
          duration: 75,
          hideOnClick: false,
        }}
        editor={editor}
        shouldShow={({ state, editor }) =>
          !state.selection.empty && !editor.isActive("link")
        }
      >
        <TooltipProvider>
          <div className="flex items-center">
            {formatButtons.map((button, index) => (
              <FormatButton
                key={index}
                onClick={button.action}
                isActive={button.isActive}
                icon={button.icon}
                tooltip={button.tooltip}
              />
            ))}
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center">
            {alignmentButtons.map((button, index) => (
              <FormatButton
                key={index}
                onClick={button.action}
                isActive={button.isActive}
                icon={button.icon}
                tooltip={button.tooltip}
              />
            ))}
          </div>
        </TooltipProvider>
      </BubbleMenu>

      <LinkBubbleMenu editor={editor} />
    </>
  );
}
