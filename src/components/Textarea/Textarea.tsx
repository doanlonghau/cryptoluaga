import { forwardRef, TextareaHTMLAttributes } from 'react'

export interface TextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

// eslint-disable-next-line react/display-name
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className = '', children, ...args }, ref) => {
		return (
			<textarea
				ref={ref}
				className={`block w-full rounded-xl border-neutral-200 bg-white text-sm hover:border-neutral-300 focus:border-primary-300 focus:ring focus:ring-primary-200/50 dark:border-neutral-600 dark:bg-transparent dark:hover:border-neutral-500 dark:focus:ring-primary-500/30 ${className}`}
				rows={4}
				{...args}
			>
				{children}
			</textarea>
		)
	},
)

export default Textarea
