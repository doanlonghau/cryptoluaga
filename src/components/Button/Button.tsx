import { ButtonHTMLAttributes, FC } from 'react'
import { Route } from '@/data/types'
import Link from 'next/link'
import Loading from './Loading'
import clsx from 'clsx'

export interface ButtonProps {
	className?: string
	sizeClass?: string
	fontSize?: string
	pattern?:
		| 'primary'
		| 'secondary'
		| 'third'
		| 'white'
		| 'link'
		| 'default'
		| 'danger'
	//
	loading?: boolean
	disabled?: boolean
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
	href?: Route
	targetBlank?: boolean
	onClick?: () => void
	children?: React.ReactNode
	title?: string
}

const Button: FC<ButtonProps> = ({
	pattern = 'default',
	className = '',
	sizeClass: sizeClassProp,
	fontSize = 'text-sm sm:text-base font-medium',
	disabled = false,
	href,
	children,
	type,
	loading,
	onClick = () => {},
	title,
}) => {
	let colors =
		'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-50 dark:text-black'

	let sizeClass = 'py-3 px-4 sm:py-3.5 sm:px-6'
	if (pattern === 'link') {
		sizeClass = 'py-3 px-3.5 sm:py-3.5 sm:px-4'
	}
	if (!!sizeClassProp) {
		sizeClass = sizeClassProp
	}

	switch (pattern) {
		case 'primary':
			colors =
				'bg-primary-700 hover:bg-primary-600 disabled:bg-primary-800 disabled:opacity-50 disabled:hover:bg-primary-700 text-primary-50'
			break
		case 'danger':
			colors =
				'bg-red-600 hover:bg-red-500 disabled:bg-red-600 text-red-50 disabled:opacity-70'
			break
		case 'secondary':
			colors =
				'bg-secondary-600 hover:bg-secondary-500 disabled:bg-secondary-600 text-secondary-50'
			break
		case 'white':
			colors =
				'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200'
			break
		case 'third':
			colors =
				'bg-white dark:bg-neutral-800 ring-1 ring-neutral-300 hover:ring-neutral-400/80 dark:ring-neutral-600 dark:hover:ring-neutral-500 disabled:hover:ring-neutral-300 dark:disabled:hover:ring-neutral-600 disabled:opacity-60'
			break
		case 'link':
			colors =
				'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900/40 text-neutral-900 dark:text-neutral-100 underline'
			break

		default:
			break
	}

	let CLASSES = clsx(
		'nc-Button relative inline-flex h-auto flex-shrink-0 items-center justify-center rounded-2xl border-transparent transition-colors',
		colors,
		fontSize,
		sizeClass,
		className,
	)

	if (!!href) {
		return (
			<Link
				href={href}
				className={CLASSES}
				onClick={onClick}
				type={type}
				title={title}
			>
				{loading && <Loading />}
				{children || `This is Link`}
			</Link>
		)
	}

	return (
		<button
			disabled={disabled || loading}
			className={CLASSES}
			onClick={onClick}
			type={type}
			title={title}
		>
			{loading && <Loading />}
			{children || `Button default`}
		</button>
	)
}

export default Button
