import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { Info } from 'lucide-react'

export default function CalloutComponent() {
  return (
    <NodeViewWrapper className="flex gap-2 bg-muted/50 pt-3 px-3 rounded-lg border my-2">
      <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
      <NodeViewContent className="m-0 p-0" />
    </NodeViewWrapper>
  )
} 