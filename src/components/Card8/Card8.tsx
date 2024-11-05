import { FC } from 'react'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon'
import Link from 'next/link'
import Image from 'next/image'
import { CommonPostCardProps } from '../Card2/Card2'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import MyImage from '../MyImage'

export interface Card8Props extends CommonPostCardProps {}

const Card8: FC<Card8Props> = ({ className = 'h-full', post }) => {
	const {
		title,
		link,
		date,
		categories,
		excerpt,
		author,
		postFormats: postType,
		featuredImage,
		ncPostMetaData,
		commentCount,
		uri,
		databaseId,
	} = getPostDataFromPostFragment(post)

	return (
		<div
			className={`nc-Card8 group relative z-0 overflow-hidden rounded-3xl ${className}`}
		>
			<Link
				href={uri || ''}
				className="z-0 block h-0 w-full overflow-hidden rounded-xl pt-[100%] sm:pt-[55%]"
			>
				<MyImage
					className="object-cover"
					src={featuredImage?.sourceUrl || ''}
					alt={title || ''}
					fill
					sizes="(max-width: 600px) 480px, 800px"
				/>
				<PostTypeFeaturedIcon
					className="absolute left-4 top-4"
					postType={postType}
					wrapSize="w-8 h-8"
					iconSize="w-4 h-4"
				/>
			</Link>
			<Link
				href={uri || ''}
				className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black opacity-60 transition-opacity hover:top-5 group-hover:opacity-70"
			></Link>
			<div className="absolute inset-x-0 bottom-0 flex flex-col p-4 sm:p-6">
				<Link href={uri || ''} className="absolute inset-0" />
				<CategoryBadgeList categories={categories?.nodes || []} />
				<h2
					className={`relative mt-3 block text-lg font-semibold text-neutral-50 sm:text-2xl`}
				>
					<Link
						dangerouslySetInnerHTML={{ __html: title }}
						href={uri || ''}
						className="line-clamp-3"
						title={title || ''}
					></Link>
				</h2>
				<div className="mt-2 hidden sm:block">
					<div
						className="text-sm text-neutral-300"
						dangerouslySetInnerHTML={{ __html: excerpt || '' }}
					></div>
				</div>
			</div>
		</div>
	)
}

export default Card8
