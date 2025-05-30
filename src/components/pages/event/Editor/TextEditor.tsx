'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectCustomUpTrigger,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bold, Image as ImageIcon, Italic, Link as LinkIcon, List, ListOrdered, Strikethrough, Underline as UnderlineIcon } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { Color } from '@tiptap/extension-color'
import { useEditor, EditorContent } from '@tiptap/react'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'

import { fontFamilies, fontSizes, textEditorLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { AlignCenter, AlignLeft, AlignRight, Redo2, Square, Undo2 } from 'lucide-react'
import { FontFamily } from './FontFamily'
import { FontSize } from './FontSize'
import UploadImageModal from '@/components/uploadImageModal'
import { Input } from '@/components/ui/input'

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
}

const MenuBar = ({ editor }: { editor: any }) => {

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url })
        .run()
    } catch (e: any) {
      alert(e.message)
    }
  }, [editor])

  const addImage = useCallback((url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  if (!editor) return null

  return <>
    <div>
      <div className="top-menu flex gap-4 p-2 ">
        {
          textEditorLinks.map((link, ind) => {
            return <span key={ind} className='e-formt text-[12px]'>{link}</span>
          })
        }
      </div>
      <Separator className='absolute left-0 mt-1 sm:hidden' />
      <div className="menu-bar flex flex-wrap justify-between items-center py-2 text-gray-500 ">
        <div className='flex items-center'>
          <div onClick={() => editor.chain().focus().undo().run()}
            className={cn(editor.isActive('undo') ? 'is-active' : '', 'hover:text-black px-[4px]! py-[4px]!')}>
            <Undo2 size={16} />
          </div>
          <div onClick={() => editor.chain().focus().redo().run()}
            className='hover:text-black px-[4px]! py-[4px]!'>
            <Redo2 className='' size={16} />
          </div>
        </div>
        <div className='flex-center'>
          <Select defaultValue='poppins' onValueChange={(value) => editor.commands.setFontFamily(value)}>
            <SelectCustomUpTrigger className="w-[110px] px-0 text-xs border-0 shadow-none text-side-blue">
              <SelectValue placeholder="Select a fruit" />
            </SelectCustomUpTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Font's</SelectLabel>
                {
                  fontFamilies.map((font,i) => (
                    <SelectItem key={i} value={font.value}>{font.label}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select defaultValue='16px' onValueChange={(value) => editor.commands.setFontSize(value)}>
            <SelectTrigger className="w-[60px] px-0 text-xs border-0 shadow-none text-side-blue">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Font size</SelectLabel>
                {
                  fontSizes.map((size,i) => (
                    <SelectItem key={i} value={size}>{size}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-center justify-between sm:gap-5">
          <Select defaultValue='left' onValueChange={(value) => editor.chain().focus().setTextAlign(value).run()}>
            <SelectTrigger className="w-[60px] px-0 text-xs border-0 shadow-none text-side-blue">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Text Alignment</SelectLabel>
                <SelectItem value="left">
                  <AlignLeft />
                </SelectItem>
                <SelectItem value="center">
                  <AlignCenter />
                </SelectItem>
                <SelectItem value="right">
                  <AlignRight />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select defaultValue='#000000' onValueChange={(value) => editor.chain().focus().setColor(value).run()}>
            <SelectTrigger className="w-[60px] px-0 gap-[5px] text-xs border-0 shadow-none text-side-blue">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Choose color</SelectLabel>
                <SelectItem value="#000000" className='p-2'>
                  <Square fill="#000000" className='' strokeWidth={0.5} strokeOpacity={0.5} size={20} />
                </SelectItem>
                <SelectItem value="#ffffff">
                  <Square fill="#ffffff" strokeOpacity={0.5} strokeWidth={0.5} />
                </SelectItem>
                <SelectItem value="#ff0000">
                  <Square fill="#ff0000" strokeOpacity={0.5} strokeWidth={0.5} />
                </SelectItem>
                <SelectItem value="#3374ff">
                  <Square fill="#3374ff" strokeOpacity={0.5} strokeWidth={0.5} />
                </SelectItem>
                <SelectItem value="#33ff33">
                  <Square fill="#33ff33" strokeOpacity={0.5} strokeWidth={0.5} />
                </SelectItem>
                <SelectItem value="#f9ff33">
                  <Square fill="#f9ff33" strokeOpacity={0.5} strokeWidth={0.5} />
                </SelectItem>
                <SelectItem value="#ff33ff">
                  <Square fill="#ff33ff" strokeOpacity={0.5} strokeWidth={0.5} />
                </SelectItem>
                <SelectItem value="#ff9900">
                  <Square fill="#ff9900" strokeOpacity={0.5} strokeWidth={0.5} />
                </SelectItem>
                <SelectItem value="#ffcc00">
                  <Square fill="#ffcc00" strokeOpacity={0.5} strokeWidth={0.5} />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=''>
          <ToggleGroup type="multiple">
            <ToggleGroupItem onClick={() => editor.chain().focus().toggleBold().run()} value="bold" className='px-1' aria-label="Toggle bold">
              <Bold className="p-[1px] text-side-blue" />
            </ToggleGroupItem>
            <ToggleGroupItem onClick={() => editor.chain().focus().toggleItalic().run()} value="italic" className='px-1' aria-label="Toggle italic">
              <Italic className="p-[1px] text-side-blue" />
            </ToggleGroupItem>
            <ToggleGroupItem onClick={() => editor.chain().focus().toggleUnderline().run()} value="underline" className='px-1' aria-label="Toggle Underline">
              <UnderlineIcon className="p-[1px] text-side-blue" />
            </ToggleGroupItem>
            <ToggleGroupItem onClick={() => editor.chain().focus().toggleStrike().run()} value="strikethrough" className='px-1' aria-label="Toggle strikethrough">
              <Strikethrough className="p-[1px] text-side-blue" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className='flex items-center'>
          <ToggleGroup aria-label="" type='single'>
            <ToggleGroupItem value='orderedList' onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              <ListOrdered className="p-[1px] text-side-blue" />
            </ToggleGroupItem>
            <ToggleGroupItem value='bulletList' onClick={() => editor.chain().focus().toggleBulletList().run()}>
              <List className="p-[1px] text-side-blue" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className='flex items-center'>
          <ToggleGroup aria-label="" type='single'>
            <ToggleGroupItem value='link' onClick={setLink}>
              <LinkIcon className="p-[1px] text-side-blue" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div>
            <UploadImageModal onClick={addImage} />
          </div>
        </div>
      </div>
    </div >
  </>
}

const SocialMediaLink = ({ editor }: { editor: any }) => {
  const [url, setUrl] = useState('');

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        // Cancel if empty
        if (url.trim() === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run();
          return;
        }

        // Ensure selection exists
        const { from, to } = editor.state.selection;
        if (from === to) {
          editor.chain().focus().insertContent(`<a href="${url.trim()}" target="_blank">${url.trim()}</a>`).run();
        } else {
          editor.chain().extendMarkRange('link').setLink({ href: url.trim() }).run();
        }

        // Apply the link
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url.trim(), target: '_blank' })
          .run();
      }
    },
    [url, editor]
  );

  return (
    <div className="flex flex-col gap-y-2 absolute left-4 bg-white z-10 bottom-0 mb-4 w-full">
      <span className="text-sm text-side-blue">Social Media Group Link</span>
      <Input
        placeholder="https://join.example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        className="rounded-full py-5 px-5 w-[95%] border-gray-200 text-xs!"
      />
    </div>
  );
};


const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      Color.configure(),
      TextStyle.configure(),
      StarterKit,
      Underline,
      Image,
      Link,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontSize,
      Highlight],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  // Ensure initial value is loaded
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [editor])

  return (
    <div className="prose relative max-w-full pb-20 min-h-[400px] max-h-[600px] overflow-y-hidden overflow-x-hidden border border-gray-300 p-2 sm:p-4 rounded-md">
      <MenuBar editor={editor} />
      <Separator className='mb-4' />
      <div className='max-h-[1000px] min-h-[200px] sm:max-h-[300px] overflow-y-auto'>
        <EditorContent editor={editor} />
      </div>
      <SocialMediaLink editor={editor} />
    </div>
  )
}

export default TextEditor
