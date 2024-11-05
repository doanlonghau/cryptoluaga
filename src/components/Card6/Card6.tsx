import { FC } from 'react'
import PostCardMeta from '@/components/PostCardMeta/PostCardMeta'
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction'
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon'
import Link from 'next/link'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import MyImage from '../MyImage'
import { CommonPostCardProps } from '../Card2/Card2'

export interface Card6Props extends CommonPostCardProps {}

const Card6: FC<Card6Props> = ({ className = 'h-full', post }) => {
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
		<div
			className={`nc-Card6 group relative flex flex-row border-neutral-200 sm:rounded-3xl sm:border sm:bg-white sm:p-4 dark:border-neutral-700 sm:dark:bg-neutral-900 ${className}`}
		>
			<Link href={uri || ''} className="absolute inset-0 z-0"></Link>
			<div className="flex flex-grow flex-col">
				<div className="mb-4 space-y-3">
					<CategoryBadgeList categories={categories?.nodes || []} />
					<h2 className={`block text-sm font-semibold sm:text-base`}>
						<Link
							dangerouslySetInnerHTML={{ __html: title }}
							href={uri || ''}
							className="line-clamp-2"
							title={title || ''}
						></Link>
					</h2>
					<PostCardMeta meta={{ author, date }} />
				</div>
				<div className="mt-auto flex flex-wrap items-center justify-between">
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

			<Link
				href={uri || ''}
				className={`relative z-0 ms-3 block max-h-28 w-24 flex-shrink-0 overflow-hidden rounded-2xl sm:ms-5 sm:max-h-full sm:w-40`}
			>
				<MyImage
					sizes="(max-width: 600px) 180px, 400px"
					className="h-full w-full object-cover"
					fill
					src={featuredImage?.sourceUrl || ''}
					alt={title || 'Card Image'}
				/>
				<span className="absolute bottom-1 start-1">
					<PostTypeFeaturedIcon
						wrapSize="h-7 w-7"
						iconSize="h-4 w-4"
						postType={postFormats || ''}
					/>
				</span>
			</Link>
		</div>
	)
}

export default Card6
