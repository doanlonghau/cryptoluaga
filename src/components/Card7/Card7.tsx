import { FC } from 'react'
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction'
import CardAuthor2 from '@/components/CardAuthor2/CardAuthor2'
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon'
import Link from 'next/link'
import { CommonPostCardProps } from '../Card2/Card2'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import MyImage from '../MyImage'

export interface Card7Props extends CommonPostCardProps {
	hoverClass?: string
	ratio?: string
}

const Card7: FC<Card7Props> = ({
	className = 'h-full',
	ratio = 'aspect-w-6 aspect-h-7 sm:aspect-h-8',
	post,
	hoverClass = '',
}) => {
	const {
		title,
		date,
		categories,
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
			className={`nc-Card7 group relative z-0 flex flex-col overflow-hidden rounded-3xl ${hoverClass} ${className}`}
		>
			<div className="absolute inset-x-0 top-0 z-[-1] flex items-center justify-between p-3 opacity-0 transition-all duration-300 group-hover:z-10 group-hover:opacity-100">
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
					hidenReadingTime
				/>
			</div>
			<Link href={uri} className={`relative flex w-full items-start ${ratio}`}>
				<MyImage
					fill
					alt={title || ''}
					sizes="(max-width: 600px) 480px,800px"
					className="h-full w-full rounded-3xl object-cover"
					src={featuredImage?.sourceUrl || ''}
				/>
				<PostTypeFeaturedIcon
					className="absolute start-3 top-3 group-hover:hidden"
					postType={postFormats}
					wrapSize="w-7 h-7"
					iconSize="w-4 h-4"
				/>
				<span className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity group-hover:opacity-100"></span>
			</Link>

			<div className="absolute inset-x-3 bottom-3 flex flex-grow flex-col rounded-3xl bg-white p-4 transition-shadow group-hover:shadow-2xl dark:bg-neutral-900">
				<Link href={uri} className="absolute inset-0"></Link>
				<div className="mb-3 space-y-2.5">
					<CategoryBadgeList categories={categories?.nodes || []} />
					<h2 className="block text-base font-semibold text-neutral-900 dark:text-neutral-100">
						<Link
							dangerouslySetInnerHTML={{ __html: title }}
							href={uri}
							title={title}
							className="line-clamp-2"
						></Link>
					</h2>
				</div>
				<CardAuthor2
					readingTime={ncPostMetaData?.readingTime || 1}
					date={date}
					author={author}
				/>
			</div>
		</div>
	)
}

export default Card7
