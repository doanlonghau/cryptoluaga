import { FC } from 'react'
import NcImage from '@/components/NcImage/NcImage'
import PostCardMeta from '@/components/PostCardMeta/PostCardMeta'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon'
import Link from 'next/link'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import { CommonPostCardProps } from '../Card2/Card2'
import ncFormatDate from '@/utils/formatDate'

export interface Card13Props extends CommonPostCardProps {}

const Card13: FC<Card13Props> = ({ className = '', post }) => {
	const {
		title,
		link,
		date,
		categories,
		excerpt,
		author,
		postFormats,
		featuredImage,
		ncPostMetaData,
		commentCount,
		uri,
		databaseId,
	} = getPostDataFromPostFragment(post)

	return (
		<div className={`nc-Card13 relative flex justify-between ${className}`}>
			<div className="flex h-full flex-col py-2">
				<h2
					className={`nc-card-title block text-sm font-semibold sm:text-base`}
				>
					<Link
						dangerouslySetInnerHTML={{ __html: title }}
						href={uri || ''}
						className="line-clamp-2"
						title={title || ''}
					></Link>
				</h2>
				<div className="my-3 hidden text-neutral-500 sm:block dark:text-neutral-400">
					<div
						dangerouslySetInnerHTML={{ __html: excerpt || '' }}
						className="line-clamp-3"
					></div>
				</div>
				<span className="mt-4 block text-xs text-neutral-500 sm:hidden">
					{ncFormatDate(date || '')}
				</span>
				<div className="mt-auto hidden sm:block">
					<PostCardMeta meta={{ author, date }} />
				</div>
			</div>

			<Link
				href={uri || ''}
				className={`relative ms-4 block h-full w-24 flex-shrink-0 sm:ms-5 sm:w-36 lg:w-40 xl:w-48 2xl:w-[200px]`}
			>
				<NcImage
					containerClassName="absolute inset-0"
					className="h-full w-full rounded-xl object-cover sm:rounded-3xl"
					src={featuredImage?.sourceUrl || ''}
					fill
					alt={title || 'Card Image'}
				/>
				<PostTypeFeaturedIcon
					className="absolute bottom-2 start-2"
					postType={postFormats || ''}
					wrapSize="w-8 h-8"
					iconSize="w-4 h-4"
				/>
			</Link>
		</div>
	)
}

export default Card13
