import { FC } from 'react'
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction'
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon'
import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia'
import Link from 'next/link'
import { CommonPostCardProps } from '../Card2/Card2'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import MyImage from '../MyImage'

export interface Card18Props extends CommonPostCardProps {
	ratio?: string
	titleClass?: string

	hoverClass?: string
	showCategories?: boolean
}

const Card18: FC<Card18Props> = ({
	className = 'h-full',
	titleClass = 'text-base lg:text-lg ',
	ratio = 'aspect-w-4 sm:aspect-w-3 aspect-h-3',
	post,
	hoverClass = '',
	showCategories = true,
}) => {
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

	const renderMeta = () => {
		return (
			<div className="inline-flex items-center">
				<h2
					dangerouslySetInnerHTML={{ __html: title }}
					className={`block font-semibold text-white ${titleClass}`}
				></h2>
			</div>
		)
	}

	return (
		<div
			className={`nc-Card18 group relative flex flex-col overflow-hidden rounded-xl ${hoverClass} ${className}`}
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
			<div className={`relative flex w-full items-start ${ratio}`}></div>
			{postFormats === 'audio' ? (
				<div className="absolute inset-0">
					<PostFeaturedMedia post={post} />
				</div>
			) : (
				<Link href={uri}>
					<MyImage
						sizes="(max-width: 600px) 480px, 800px"
						alt="featured"
						className="h-full w-full rounded-xl object-cover"
						src={featuredImage?.sourceUrl || ''}
						fill
					/>
					<PostTypeFeaturedIcon
						className="absolute left-3 top-3 group-hover:hidden"
						postType={postFormats}
						wrapSize="w-7 h-7"
						iconSize="w-4 h-4"
					/>
					<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
				</Link>
			)}
			<Link
				href={uri}
				className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black opacity-80"
			></Link>
			<div className="absolute inset-x-0 bottom-0 flex flex-grow flex-col p-4 sm:p-6">
				<Link href={uri} className="absolute inset-0"></Link>
				{showCategories && (
					<div className="mb-3">
						<CategoryBadgeList categories={categories?.nodes || []} />
					</div>
				)}
				{renderMeta()}
			</div>
		</div>
	)
}

export default Card18
