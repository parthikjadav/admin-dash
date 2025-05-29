"use client"

import { Mark, mergeAttributes } from '@tiptap/core'

export interface FontFamilyAttributes {
  font: string | null
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontFamily: {
      setFontFamily: (font: string) => ReturnType
      unsetFontFamily: () => ReturnType
    }
  }
}

export const FontFamily = Mark.create<{
  HTMLAttributes: Record<string, any>
}>({
  name: 'fontFamily',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      font: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontFamily || null,
        renderHTML: (attributes: FontFamilyAttributes) => {
          if (!attributes.font) return {}
          return {
            style: `font-family: ${attributes.font}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [{ style: 'font-family' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setFontFamily:
        (font: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { font })
        },
      unsetFontFamily:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
    }
  },
})
