'use client'

import { trpc } from '@/modules/infrastructure/api/trpc/client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { FaBold, FaHeading, FaItalic, FaListUl } from 'react-icons/fa'

type EditTiptapProps = {
    content: string
    onChange: (content: string) => void
    id: string
}

export default function EditTiptap({ content, onChange, id }: EditTiptapProps) {
    const {
        data: post,
        isLoading,
        isError,
        error,
    } = trpc.posts.getPostsById.useQuery({ id })
    const editor = useEditor({
        extensions: [StarterKit],
        content: post?.content ?? '',
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
        <div className="max-w-[900px] rounded-xl border-[2px] border-black sm:max-w-[500px] sm:min-w-[290px] lg:min-w-[400px]">
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
