import { FC } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import Link from 'next/link'
import { NcmazFcUserFullFieldsFragment } from '@/__generated__/graphql'
import ncFormatDate from '@/utils/formatDate'
import { FragmentType } from '@/__generated__'
import { NC_USER_FULL_FIELDS_FRAGMENT } from '@/fragments'
import { getUserDataFromUserCardFragment } from '@/utils/getUserDataFromUserCardFragment'

export interface PostCardMetaProps {
	className?: string
	meta: {
		date?: string
		author?:
			| FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
			| NcmazFcUserFullFieldsFragment
	}
	hiddenAvatar?: boolean
	avatarSize?: string
}

const PostCardMeta: FC<PostCardMetaProps> = ({
	className = 'leading-none text-xs',
	meta,
	hiddenAvatar = false,
	avatarSize = 'h-7 w-7 text-sm',
}) => {
	const { date } = meta

	const author = getUserDataFromUserCardFragment(
		meta.author as FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>,
	)

	if (!author.databaseId && !date) {
		return null
	}

	return (
		<div
			className={`nc-PostCardMeta inline-flex flex-wrap items-center text-neutral-800 dark:text-neutral-200 ${className}`}
		>
			{author?.databaseId && (
				<Link
					href={author?.uri || ''}
					className="relative flex items-center space-x-2 rtl:space-x-reverse"
				>
					{!hiddenAvatar && (
						<Avatar
							radius="rounded-full"
							sizeClass={avatarSize}
							imgUrl={author.featuredImageMeta?.sourceUrl || ''}
							userName={author?.name || ''}
						/>
					)}
					<span className="block font-medium capitalize text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white">
						{author?.name || ''}
					</span>
				</Link>
			)}
			<>
				{author?.databaseId && (
					<span className="mx-[6px] font-medium text-neutral-500 dark:text-neutral-400">
						·
					</span>
				)}
				<span className="font-normal text-neutral-500 dark:text-neutral-400">
					{ncFormatDate(date || '')}
				</span>
			</>
		</div>
	)
}

export default PostCardMeta
