import { FC } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import Link from 'next/link'
import { NcmazFcUserFullFieldsFragment } from '@/__generated__/graphql'
import { FragmentType, useFragment } from '@/__generated__'
import { NC_USER_FULL_FIELDS_FRAGMENT } from '@/fragments'
import ncFormatDate from '@/utils/formatDate'
import { getUserDataFromUserCardFragment } from '@/utils/getUserDataFromUserCardFragment'

export interface CardAuthor2Props {
	author:
		| FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
		| NcmazFcUserFullFieldsFragment
	date: string
	className?: string
	readingTime?: number
	hoverReadingTime?: boolean
}

const CardAuthor2: FC<CardAuthor2Props> = ({
	className = '',
	author,
	readingTime,
	date,
	hoverReadingTime = false,
}) => {
	const { databaseId, uri, name, featuredImageMeta } =
		getUserDataFromUserCardFragment(
			author as FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>,
		)

	return (
		<Link
			href={uri || ''}
			className={`nc-CardAuthor2 relative inline-flex items-center ${className}`}
		>
			<Avatar
				sizeClass="h-10 w-10 text-base"
				containerClassName="flex-shrink-0 me-3"
				radius="rounded-full"
				imgUrl={featuredImageMeta?.sourceUrl || ''}
				userName={name || ''}
			/>
			<div>
				<h2
					className={`text-sm font-medium capitalize text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white`}
				>
					{name}
				</h2>
				<span
					className={`mt-1 flex items-center text-xs text-neutral-500 dark:text-neutral-400`}
				>
					<span>{ncFormatDate(date || '')}</span>
					{readingTime && (
						<>
							<span
								className={`mx-1 hidden transition-opacity lg:inline ${
									hoverReadingTime ? 'opacity-0 group-hover:opacity-100' : ''
								}`}
							>
								·
							</span>
							<span
								className={`hidden transition-opacity lg:inline ${
									hoverReadingTime ? 'opacity-0 group-hover:opacity-100' : ''
								}`}
							>
								{readingTime} min read
							</span>
						</>
					)}
				</span>
			</div>
		</Link>
	)
}

export default CardAuthor2
