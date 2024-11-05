import { FC } from 'react'
import NcImage from '@/components/NcImage/NcImage'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import Avatar from '@/components/Avatar/Avatar'
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon'
import Link from 'next/link'
import { CommonPostCardProps } from '../Card2/Card2'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import { useFragment } from '@/__generated__'
import { NC_IMAGE_MEDIA_FRAGMENT } from '@/fragments'
import ncFormatDate from '@/utils/formatDate'

export interface Card14Props extends CommonPostCardProps {
	hoverClass?: string
	ratio?: string
}

const Card14: FC<Card14Props> = ({
	className = 'h-full',
	ratio = 'aspect-w-5 aspect-h-5',
	post,
	hoverClass = '',
}) => {
	const { title, date, categories, author, postFormats, featuredImage, uri } =
		getPostDataFromPostFragment(post)

	const authorFeaturedImage = useFragment(
		NC_IMAGE_MEDIA_FRAGMENT,
		author?.ncUserMeta?.featuredImage?.node,
	)

	return (
		<div
			className={`nc-Card14 group relative flex flex-col overflow-hidden rounded-3xl ${hoverClass} ${className}`}
		>
			<Link href={uri} className={`relative flex w-full items-start ${ratio}`}>
				<NcImage
					alt="post"
					containerClassName="absolute inset-0 overflow-hidden"
					fill
					className="h-full w-full rounded-3xl object-cover"
					src={featuredImage?.sourceUrl || ''}
				/>

				<span className="absolute inset-0 bg-black bg-opacity-40">
					<PostTypeFeaturedIcon
						className="absolute end-4 top-4"
						postType={postFormats}
						wrapSize="w-8 h-8"
						iconSize="w-4 h-4"
					/>
				</span>
			</Link>

			<div className="absolute inset-x-4 top-4 sm:inset-x-5 sm:top-5">
				<CategoryBadgeList
					itemClass="px-3 py-[6px]"
					categories={categories?.nodes || []}
				/>
			</div>

			<div className="dark absolute inset-x-4 bottom-4 flex flex-grow flex-col sm:inset-x-5 sm:bottom-4">
				<h2 className="block text-base font-semibold text-white">
					<Link
						dangerouslySetInnerHTML={{ __html: title }}
						href={uri}
						className="line-clamp-2"
						title={title}
					></Link>
				</h2>

				<div className="mt-4 flex items-center rounded-full bg-white bg-opacity-20 p-2 text-xs font-medium text-neutral-50 backdrop-blur-lg backdrop-filter sm:mt-5 sm:p-2.5 sm:text-[13px]">
					<Link
						href={author?.uri || ''}
						className="relative flex items-center space-x-2 rtl:space-x-reverse"
					>
						<Avatar
							radius="rounded-full"
							containerClassName="ring-2 ring-white"
							sizeClass="h-6 w-6 text-sm"
							imgUrl={authorFeaturedImage?.sourceUrl || ''}
							userName={author.name || ''}
						/>
						<span className="block truncate text-white">
							{author.name || ''}
						</span>
					</Link>
					<>
						<span className="mx-[6px]">·</span>
						<span className="truncate font-normal">
							{ncFormatDate(date || '')}
						</span>
					</>
				</div>
			</div>
		</div>
	)
}

export default Card14
