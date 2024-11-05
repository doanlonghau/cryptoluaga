import { forwardRef, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	sizeClass?: string
	fontClass?: string
	rounded?: string
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className = '',
			sizeClass = 'h-11 px-4 py-3',
			fontClass = 'text-sm font-normal',
			rounded = 'rounded-2xl',
			children,
			type = 'text',
			...args
		},
		ref,
	) => {
		return (
			<input
				ref={ref}
				type={type}
				className={`block w-full border-neutral-200 bg-white hover:ring hover:ring-primary-200/50 focus:border-primary-300 focus:ring focus:ring-primary-200/50 dark:border-neutral-600 dark:bg-transparent dark:hover:ring-primary-500/30 dark:focus:ring-primary-500/30 ${rounded} ${fontClass} ${sizeClass} ${className}`}
				{...args}
			/>
		)
	},
)

export default Input
