'use client'
import { FC, useState } from 'react'
import NcImage from '@/components/NcImage/NcImage'
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia'
import CardAuthor2 from '@/components/CardAuthor2/CardAuthor2'
import Link from 'next/link'
import { CommonPostCardProps } from '../Card2/Card2'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'

export interface Card10V3Props extends CommonPostCardProps {
	galleryType?: 1 | 2
}

const Card10V3: FC<Card10V3Props> = ({
	className = 'h-full',
	post,
	galleryType = 1,
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
		ncmazGalleryImgs: galleryImgs,
	} = getPostDataFromPostFragment(post)

	const [isHover, setIsHover] = useState(false)

	const renderGallery2 = () => {
		if (!galleryImgs || !galleryImgs.length) return null
		return (
			<div className="grid h-full w-full grid-rows-2 gap-2">
				<div className="grid grid-cols-3 gap-2">
					<NcImage
						alt={title || ''}
						fill
						containerClassName="relative col-span-2"
						className="absolute inset-0 h-full w-full object-cover"
						src={galleryImgs[0]?.sourceUrl || ''}
					/>
					<NcImage
						alt=""
						fill
						containerClassName="relative"
						className="absolute inset-0 h-full w-full object-cover"
						src={galleryImgs[1]?.sourceUrl || ''}
					/>
				</div>
				<div className="grid grid-cols-3 gap-2">
					<NcImage
						alt=""
						fill
						containerClassName="relative"
						className="absolute inset-0 h-full w-full object-cover"
						src={galleryImgs[2]?.sourceUrl || ''}
					/>
					<NcImage
						alt=""
						fill
						containerClassName="relative col-span-2"
						className="absolute inset-0 h-full w-full object-cover"
						src={galleryImgs[3]?.sourceUrl || ''}
					/>
				</div>
			</div>
		)
	}

	const renderGallery = () => {
		if (!galleryImgs || !galleryImgs.length) return null
		return (
			<div className="grid h-full w-full grid-cols-3 gap-2">
				<div className="grid">
					<NcImage
						alt=""
						fill
						containerClassName="relative"
						className="absolute inset-0 h-full w-full object-cover"
						src={galleryImgs[0]?.sourceUrl || ''}
					/>
				</div>
				<div className="grid grid-rows-2 gap-2">
					<NcImage
						alt=""
						fill
						containerClassName="relative"
						className="absolute inset-0 h-full w-full object-cover"
						src={galleryImgs[1]?.sourceUrl || ''}
					/>
					<NcImage
						alt=""
						fill
						containerClassName="relative"
						className="absolute inset-0 h-full w-full object-cover"
						src={galleryImgs[2]?.sourceUrl || ''}
					/>
				</div>
				<div className="grid">
					<NcImage
						alt=""
						fill
						containerClassName="relative"
						className="absolute inset-0 h-full w-full object-cover"
						src={galleryImgs[3]?.sourceUrl || ''}
					/>
				</div>
			</div>
		)
	}

	return (
		<div
			className={`nc-Card10V3 group relative flex flex-col ${className}`}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<div className="group aspect-h-16 aspect-w-16 relative z-0 block w-full flex-shrink-0 overflow-hidden rounded-3xl sm:aspect-h-9">
				<div>
					{postFormats === 'gallery' && galleryImgs?.length ? (
						galleryType === 1 ? (
							renderGallery()
						) : (
							renderGallery2()
						)
					) : (
						<PostFeaturedMedia post={post} isHover={isHover} />
					)}
				</div>

				<Link
					href={uri || ''}
					className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity group-hover:opacity-100"
				></Link>
			</div>
			<div className="absolute inset-x-3 top-3 flex items-start justify-between space-x-4 rtl:space-x-reverse">
				<CategoryBadgeList categories={categories?.nodes || []} />
				<PostCardSaveAction
					hidenReadingTime
					readingTime={ncPostMetaData?.readingTime || 1}
					postDatabseId={databaseId || 0}
				/>
			</div>

			<div className="mt-4 space-y-2.5 px-2 sm:px-4">
				<h2 className="nc-card-title block font-semibold text-neutral-900 sm:text-lg dark:text-neutral-100">
					<Link
						dangerouslySetInnerHTML={{ __html: title }}
						href={uri || ''}
						className="line-clamp-2"
						title={title || ''}
					></Link>
				</h2>
				<CardAuthor2
					className="mt-3"
					author={author}
					hoverReadingTime={false}
					date={date}
					readingTime={ncPostMetaData?.readingTime || 1}
				/>
			</div>
		</div>
	)
}

export default Card10V3
