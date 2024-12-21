import { Node } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import CalloutComponent from "./callout-component"

export default Node.create({
  name: "callout",
  group: "block",
  content: "paragraph+",
  
  parseHTML() {
    return [{ tag: 'div[data-type="callout"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 
      'data-type': 'callout',
      style: 'line-height: 1.2;',  // reduce line height
      ...HTMLAttributes 
    }, 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent)
  }
})
