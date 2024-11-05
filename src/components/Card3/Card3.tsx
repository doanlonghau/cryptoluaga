import { FC } from 'react'
import NcImage from '@/components/NcImage/NcImage'
import PostCardMeta from '@/components/PostCardMeta/PostCardMeta'
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction'
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon'
import Link from 'next/link'
import { CommonPostCardProps } from '../Card2/Card2'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'

export interface Card3Props extends CommonPostCardProps {}

const Card3: FC<Card3Props> = ({ className = 'h-full', post }) => {
	const {
		title,
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
		<div
			className={`nc-Card3 group relative flex flex-row items-center ${className}`}
		>
			<div className="flex flex-grow flex-col">
				<div className="space-y-3.5">
					<CategoryBadgeList categories={categories?.nodes || []} />
					<Link href={uri || ''} className="block">
						<h2
							className={`nc-card-title block text-sm font-medium text-neutral-900 sm:text-base sm:font-semibold xl:text-lg dark:text-neutral-100`}
						>
							<span
								dangerouslySetInnerHTML={{ __html: title }}
								className="line-clamp-2"
								title={title || ''}
							></span>
						</h2>
						<div className="hidden sm:mt-2 sm:block">
							<div
								dangerouslySetInnerHTML={{ __html: excerpt || '' }}
								className="line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400"
							></div>
						</div>
					</Link>

					<PostCardMeta meta={{ author, date }} />
				</div>
				<div className="mt-5 flex flex-wrap items-center justify-between">
					<PostCardLikeAndComment
						className="relative"
						commentCount={commentCount || 0}
						linkToPost={uri || ''}
						likeCount={ncPostMetaData?.likesCount || 0}
						postDatabseId={databaseId || 0}
						viewCount={ncPostMetaData?.viewsCount || 0}
					/>
					<PostCardSaveAction
						className="relative"
						readingTime={ncPostMetaData?.readingTime || 1}
						postDatabseId={databaseId || 0}
					/>
				</div>
			</div>

			<div
				className={`z-0 mb-5 ms-3 block w-24 flex-shrink-0 overflow-hidden rounded-3xl sm:mb-0 sm:ms-6 sm:w-36 md:w-44 xl:w-56`}
			>
				<Link
					href={uri || ''}
					className="aspect-h-1 aspect-w-1 relative block h-0 w-full"
				>
					<NcImage
						containerClassName="absolute inset-0"
						src={featuredImage?.sourceUrl || ''}
						fill
						alt={title || ''}
						className="h-full w-full rounded-3xl object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					<span>
						<PostTypeFeaturedIcon
							className="absolute bottom-2 left-2"
							postType={postFormats}
							wrapSize="w-8 h-8"
							iconSize="w-4 h-4"
						/>
					</span>
				</Link>
			</div>
		</div>
	)
}

export default Card3
