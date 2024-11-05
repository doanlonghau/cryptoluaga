import { FC } from 'react'

import Avatar from '@/components/Avatar/Avatar'
import Link from 'next/link'
import { NcmazFcUserFullFieldsFragment } from '@/__generated__/graphql'
import { getImageDataFromImageFragment } from '@/utils/getImageDataFromImageFragment'

export interface CardAuthorProps {
	className?: string
	author: NcmazFcUserFullFieldsFragment
}

const CardAuthor: FC<CardAuthorProps> = ({ className = '', author }) => {
	const { databaseId, name, ncUserMeta, uri } = author
	return (
		<Link
			href={uri || ''}
			className={`nc-CardAuthor flex items-center ${className}`}
		>
			<Avatar
				sizeClass="h-10 w-10 text-base"
				containerClassName="flex-shrink-0 me-4"
				radius="rounded-full"
				imgUrl={
					getImageDataFromImageFragment(ncUserMeta?.featuredImage?.node)
						.sourceUrl
				}
				userName={name || 'T'}
			/>
			<div>
				<h2
					className={`text-sm font-medium capitalize text-neutral-900 sm:text-base sm:font-semibold dark:text-neutral-100`}
				>
					{name}
				</h2>
				<span
					className={`mt-[2px] block text-xs text-neutral-500 dark:text-neutral-400`}
				>
					{ncUserMeta?.ncBio}
				</span>
			</div>
		</Link>
	)
}

export default CardAuthor
