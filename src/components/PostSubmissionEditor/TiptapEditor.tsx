import { FC } from 'react'
import {
	useEditor,
	EditorContent,
	Editor,
	mergeAttributes,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TiptapImage from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Youtube from '@tiptap/extension-youtube'
import Iframe from './Iframe'
//
import MenuBar from './MenuBar'
import MyBubbleMenu from './MyBubbleMenu'
import getTrans from '@/utils/getTrans'

interface Props {
	onUpdate: (editor: Editor) => void
	defaultContent?: string
}

const TiptapEditor: FC<Props> = ({ onUpdate, defaultContent = '' }) => {
	const T = getTrans()

	const Image = TiptapImage.extend({
		renderHTML({ node, HTMLAttributes }) {
			return [
				'figure',
				{ class: 'proseMirror__image-wrapper wp-block-image' },
				['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
			]
		},
	})

	const editor = useEditor({
		extensions: [
			StarterKit,
			Highlight,
			Underline,
			Table,
			TableCell,
			TableHeader,
			TableRow,
			Iframe,
			Link.configure({
				openOnClick: false,
				linkOnPaste: true,
			}),
			Placeholder.configure({
				placeholder: T.pageSubmission['Write your post content here…'],
				showOnlyCurrent: false,
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Image.configure({
				allowBase64: true,
				HTMLAttributes: {
					class: 'ncmaz-custom-img-editor rounded',
				},
				inline: true,
			}),
			Youtube.configure({
				controls: false,
			}),
		],
		editorProps: {
			attributes: {
				class:
					'focus:outline-none prose prose-neutral lg:prose-lg dark:prose-invert max-w-screen-md mx-auto min-h-[500px]',
			},
		},
		content: defaultContent,

		onUpdate: ({ editor }) => {
			// @ts-ignore
			onUpdate(editor)
		},
	})

	return (
		<div className="nc-TiptapEditor">
			<div className="editor">
				{editor && <MyBubbleMenu editor={editor} />}
				{editor && <MenuBar editor={editor} />}
				<EditorContent
					className="editor__content focus:outline-none"
					editor={editor}
				/>
			</div>
		</div>
	)
}

export default TiptapEditor
