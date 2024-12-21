"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ModeToggle from "@/components/mode-toggle";
import LinkDialog from "@/components/editor/link-dialog";
import {
  Bold,
  Italic,
  List,
  Save,
  Strikethrough,
  Code,
  Highlighter,
  Underline,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  TextQuote,
  Undo2,
  Redo2,
  Lightbulb
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import StyleDropdown from "./style-dropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorToolbarProps {
  editor: Editor | null;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
  disabled?: boolean;
}

function ToolbarButton({
  onClick,
  isActive,
  icon,
  disabled,
  tooltip,
}: ToolbarButtonProps & { tooltip: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className={cn(isActive && "bg-accent")}
          disabled={disabled}
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

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const [update, setUpdate] = useState(0);
  const [storedMarks, setStoredMarks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!editor) return;

    const updateListener = () => {
      setUpdate((n) => n + 1);
      // update stored marks based on current marks
      setStoredMarks({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        strike: editor.isActive("strike"),
      });
    };

    editor.on("update", updateListener);
    editor.on("selectionUpdate", updateListener);

    return () => {
      editor.off("update", updateListener);
      editor.off("selectionUpdate", updateListener);
    };
  }, [editor]);

  if (!editor) return null;

  const wordCount = editor.storage.characterCount?.words() ?? 0;

  const formatButtons = [
    {
      icon: <Bold className="h-4 w-4" />,
      action: () => {
        const newState = !editor.isActive("bold");
        setStoredMarks((prev) => ({ ...prev, bold: newState }));
        editor.chain().focus().toggleBold().run();
      },
      isActive: editor.isActive("bold") || storedMarks.bold,
      tooltip: "Bold",
    },
    {
      icon: <Italic className="h-4 w-4" />,
      action: () => {
        const newState = !editor.isActive("italic");
        setStoredMarks((prev) => ({ ...prev, italic: newState }));
        editor.chain().focus().toggleItalic().run();
      },
      isActive: editor.isActive("italic") || storedMarks.italic,
      tooltip: "Italic",
    },
    {
      icon: <Underline className="h-4 w-4" />,
      action: () => {
        const newState = !editor.isActive("underline");
        setStoredMarks((prev) => ({ ...prev, underline: newState }));
        editor.chain().focus().toggleUnderline().run();
      },
      isActive: editor.isActive("underline") || storedMarks.underline,
      tooltip: "Underline",
    },
    {
      icon: <Strikethrough className="h-4 w-4" />,
      action: () => {
        const newState = !editor.isActive("strike");
        setStoredMarks((prev) => ({ ...prev, strike: newState }));
        editor.chain().focus().toggleStrike().run();
      },
      isActive: editor.isActive("strike") || storedMarks.strike,
      tooltip: "Strikethrough",
    },
  ];

  const listButtons = [
    {
      icon: <List className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      tooltip: "Numbered List",
    },
    {
      icon: <TextQuote className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      tooltip: "Block Quote",
    },
  ];

  const extraButtons = [
    {
      icon: <Code className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
      tooltip: "Code Block",
    },
    {
      icon: <Lightbulb className="h-4 w-4" />,
      action: () => {
        if (editor.isActive('callout')) {
          editor.chain().focus().lift('callout').run()
        } else {
          editor.chain().focus().wrapIn('callout').run()
        }
      },
      isActive: editor.isActive('callout'),
      tooltip: "Callout",
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
      tooltip: "Align Center",
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

  const handleSave = () => {
    if (!editor) return;
    
    const json = editor.getJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // download file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'editor-content.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // open in new tab
    window.open(url, '_blank');
    
    // cleanup
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background p-2 flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleSave}
            >
              <Save className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            <p>Save as JSON</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex items-center">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            isActive={false}
            disabled={!editor.can().undo()}
            icon={<Undo2 className={cn(
              "h-4 w-4",
              !editor.can().undo() && "opacity-50"
            )} />}
            tooltip="Undo"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            isActive={false}
            disabled={!editor.can().redo()}
            icon={<Redo2 className={cn(
              "h-4 w-4",
              !editor.can().redo() && "opacity-50"
            )} />}
            tooltip="Redo"
          />
        </div>

        <Separator orientation="vertical" className="h-6" />

        <StyleDropdown editor={editor} />
        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center">
          {formatButtons.map((button, index) => (
            <ToolbarButton
              key={`format-${index}`}
              onClick={button.action}
              isActive={button.isActive}
              icon={button.icon}
              tooltip={button.tooltip}
            />
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center">
          {listButtons.map((button, index) => (
            <ToolbarButton
              key={`list-${index}`}
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
            <ToolbarButton
              key={`align-${index}`}
              onClick={button.action}
              isActive={button.isActive}
              icon={button.icon}
              tooltip={button.tooltip}
            />
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center">
          {extraButtons.map((button, index) => (
            <ToolbarButton
              key={`extra-${index}`}
              onClick={button.action}
              isActive={button.isActive}
              icon={button.icon}
              tooltip={button.tooltip}
            />
          ))}

          <LinkDialog editor={editor} />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          <ModeToggle />
        </div>
      </TooltipProvider>
    </div>
  );
}
