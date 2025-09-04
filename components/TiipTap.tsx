'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { FaBold, FaHeading, FaItalic, FaListUl } from 'react-icons/fa'

type TiptapEditorProps = {
    content: string
    onChange: (content: string) => void
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        return () => {
            editor?.destroy()
        }
    }, [editor])

    if (!editor) return null

    return (
        <div className="max-w-[600px] rounded-xl border-[2px] border-black max-lg:w-[900px] max-lg:items-center max-sm:w-[300px] max-sm:min-w-[290px]">
            <div className="flex gap-2 border-b p-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={
                        editor.isActive('bold') ? 'rounded bg-gray-300 px-2' : 'px-2'
                    }
                >
                    <FaBold />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={
                        editor.isActive('italic') ? 'rounded bg-gray-300 px-2' : 'px-2'
                    }
                >
                    <FaItalic />
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive('heading', { level: 2 })
                            ? 'rounded bg-gray-300 px-2'
                            : 'px-2'
                    }
                >
                    <FaHeading />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={
                        editor.isActive('bulletList')
                            ? 'rounded bg-gray-300 px-2'
                            : 'px-2'
                    }
                >
                    <FaListUl />
                </button>
            </div>

            {/* 🔹 Editable area */}
            <EditorContent editor={editor} className="min-h-[200px] rounded-md p-2" />
        </div>
    )
}
