import { FC } from 'react'
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction'
import CardAuthor2 from '@/components/CardAuthor2/CardAuthor2'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import Link from 'next/link'
import { CommonPostCardProps } from '../Card2/Card2'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import MyImage from '../MyImage'

export interface Card4Props extends CommonPostCardProps {}

const Card4: FC<Card4Props> = ({ className = 'h-full', post }) => {
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
			className={`nc-Card4 group relative flex flex-col rounded-2xl bg-white dark:bg-neutral-900 ${className}`}
		>
			<span className="aspect-h-9 aspect-w-16 relative block w-full flex-shrink-0 overflow-hidden rounded-t-2xl">
				<MyImage
					fill
					className="object-cover"
					alt={title || ''}
					sizes="(max-width: 600px) 480px, 800px"
					src={featuredImage?.sourceUrl || ''}
				/>
			</span>

			<Link href={uri} className="absolute inset-0"></Link>

			<div className="flex flex-grow flex-col rounded-b-2xl border border-t-0 border-neutral-100 p-4 dark:border-black/20">
				<div className="mb-4 space-y-2.5">
					<CategoryBadgeList categories={categories?.nodes || []} />
					<h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
						<Link
							dangerouslySetInnerHTML={{ __html: title }}
							href={uri}
							className="line-clamp-2"
							title={title}
						></Link>
					</h2>
				</div>
				<div className="mt-auto flex items-end justify-between">
					<CardAuthor2
						readingTime={ncPostMetaData?.readingTime || 1}
						date={date}
						author={author}
					/>
					<PostCardSaveAction postDatabseId={databaseId} hidenReadingTime />
				</div>
			</div>
		</div>
	)
}

export default Card4
