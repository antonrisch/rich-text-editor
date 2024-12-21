import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { Editor } from '@tiptap/react'
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface StyleDropdownProps {
  editor: Editor
  isBubbleMenu?: boolean
  size?: "sm" | "default"
  onOpenChange?: (open: boolean) => void
}

export default function StyleDropdown({ 
  editor, 
  isBubbleMenu, 
  size = "default",
  onOpenChange 
}: StyleDropdownProps) {
  const styleOptions = [
    { 
      name: 'Paragraph', 
      action: () => editor.chain().focus().setParagraph().run(), 
      isActive: editor.isActive('paragraph') 
    },
    { 
      name: 'Heading 1', 
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), 
      isActive: editor.isActive('heading', { level: 1 }) 
    },
    { 
      name: 'Heading 2', 
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), 
      isActive: editor.isActive('heading', { level: 2 }) 
    },
    { 
      name: 'Heading 3', 
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), 
      isActive: editor.isActive('heading', { level: 3 }) 
    },
  ]

  const getCurrentStyle = () => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1'
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2'
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3'
    return 'Paragraph'
  }

  return (
    <DropdownMenu 
      modal={false} 
      onOpenChange={onOpenChange}
    >
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={size} 
          className="justify-between transition-colors duration-200 w-32"
        >
          {getCurrentStyle()}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start"
        avoidCollisions={false}
        side={isBubbleMenu ? "top" : "bottom"}
        sideOffset={isBubbleMenu ? 8 : 4}
        className="w-32 animate-in data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2"
      >
        {styleOptions.map((style, index) => (
          <DropdownMenuItem
            key={`style-${index}`}
            className={cn(
              style.isActive && 'bg-accent',
              'transition-colors duration-150 flex justify-between items-center'
            )}
            onClick={style.action}
          >
            {style.name}
            {style.isActive && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 