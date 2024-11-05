import { CustomLink } from '@/data/types'
import { FC } from 'react'
import twFocusClass from '@/utils/twFocusClass'
import Link from 'next/link'

const DEMO_PAGINATION: CustomLink[] = [
	{
		label: '1',
		href: '/',
	},
	{
		label: '2',
		href: '/',
	},
	{
		label: '3',
		href: '/',
	},
	{
		label: '4',
		href: '/',
	},
]

export interface PaginationProps {
	className?: string
}

const Pagination: FC<PaginationProps> = ({ className = '' }) => {
	const renderItem = (pag: CustomLink, index: number) => {
		if (index === 0) {
			// RETURN ACTIVE PAGINATION
			return (
				<span
					key={index}
					className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white ${twFocusClass()}`}
				>
					{pag.label}
				</span>
			)
		}
		// RETURN UNACTIVE PAGINATION
		return (
			<Link
				key={index}
				className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 ${twFocusClass()}`}
				href={pag.href}
			>
				{pag.label}
			</Link>
		)
	}

	return (
		<nav
			className={`nc-Pagination inline-flex space-x-1 text-base font-medium rtl:space-x-reverse ${className}`}
		>
			{DEMO_PAGINATION.map(renderItem)}
		</nav>
	)
}

export default Pagination
