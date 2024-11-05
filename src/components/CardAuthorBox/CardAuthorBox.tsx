import { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Avatar from '@/components/Avatar/Avatar'
import Link from 'next/link'
import { NC_USER_FULL_FIELDS_FRAGMENT } from '@/fragments'
import { FragmentType } from '@/__generated__'
import { getUserDataFromUserCardFragment } from '@/utils/getUserDataFromUserCardFragment'

export interface CardAuthorBoxProps {
	className?: string
	author: FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
}

const CardAuthorBox: FC<CardAuthorBoxProps> = ({ className = '', author }) => {
	const { databaseId, featuredImageMeta, name, uri, ncUserMeta } =
		getUserDataFromUserCardFragment(author)
	return (
		<Link
			href={uri}
			className={`nc-CardAuthorBox flex flex-col items-center justify-center rounded-3xl bg-neutral-100/70 px-3 py-5 text-center sm:px-6 sm:py-7 dark:bg-neutral-900 ${className}`}
		>
			<Avatar
				sizeClass="w-20 h-20 text-xl"
				radius="rounded-full"
				imgUrl={featuredImageMeta?.sourceUrl || ''}
				userName={name}
			/>
			<div className="mt-3">
				<h2 className={`text-sm font-medium sm:text-base`}>
					<span className="line-clamp-1">{name}</span>
				</h2>
				<span
					className={`mt-1 block text-sm text-neutral-500 dark:text-neutral-400`}
				>
					{ncUserMeta?.ncBio}
				</span>
			</div>
			<div className="mt-4 flex items-center justify-center rounded-full bg-neutral-200/70 px-4 py-2 text-xs font-medium leading-none dark:bg-neutral-800">
				<ArrowRightIcon className="h-5 w-5 text-yellow-600" />
			</div>
		</Link>
	)
}

export default CardAuthorBox
