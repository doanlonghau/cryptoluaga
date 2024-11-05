import Link from 'next/link'
import { FC } from 'react'

export interface TagProps {
	className?: string
	hideCount?: boolean
	name: string
	count?: number
	uri: string
}

const Tag: FC<TagProps> = ({
	className = '',
	count,
	name,
	uri,
	hideCount = true,
}) => {
	return (
		<Link
			className={`nc-Tag inline-block rounded-lg bg-white px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 md:px-4 md:py-2.5 dark:bg-neutral-900 dark:text-neutral-300 ${className}`}
			href={uri}
		>
			{`${name}`}
			{!hideCount && count && (
				<span className="text-xs font-normal"> ({count})</span>
			)}
		</Link>
	)
}

export default Tag
