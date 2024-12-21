import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface LinkDialogProps {
  editor: Editor;
  size?: "sm" | "icon";
}

interface LinkFormData {
  url: string;
}

export default function LinkDialog({ editor, size = "icon" }: LinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<LinkFormData>({
    url: "",
  });

  const getCurrentLinkData = (): LinkFormData => {
    const linkAttrs = editor.getAttributes("link");
    return {
      url: linkAttrs.href || "",
    };
  };

  // update form data when dialog opens
  useEffect(() => {
    if (open) {
      setFormData(getCurrentLinkData());
    }
  }, [open]);

  const setLink = ({ url }: LinkFormData) => {
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // if text is selected, update or create link on selection
    if (!editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ 
          href: url,
          rel: "noopener noreferrer nofollow"
        })
        .run();
      return;
    }

    // if no selection, insert url as link
    editor
      .chain()
      .focus()
      .insertContent({
        type: "text",
        text: url,
        marks: [
          {
            type: "link",
            attrs: { 
              href: url,
              rel: "noopener noreferrer nofollow"
            },
          },
        ],
      })
      .run();
  };

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isSubmitDisabled = !formData.url || !isValidUrl(formData.url);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size={size}
                className={cn(editor.isActive("link") && "bg-accent")}
              >
                <Link2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            <p>Add link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLink(formData);
            setOpen(false);
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={unsetLink}
                disabled={!editor.isActive("link")}
              >
                Remove Link
              </Button>
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                variant="default"
                className="bg-blue-100 border-blue-600 border-2 text-blue-600 hover:bg-blue-200
                dark:bg-blue-500/20 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500/30
                "
              >
                {editor.isActive("link") ? "Update Link" : "Add Link"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
