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
import Skeleton from 'react-loading-skeleton'
import PostCardLikeCommentSaveSkeleton from '../Skeleton/PostCardLikeCommentSaveSkeleton'

export interface Card3SkeletonProps {
	className?: string
}

const Card3Skeleton: FC<Card3SkeletonProps> = ({ className = 'h-full' }) => {
	return (
		<div
			className={`nc-Card3 group relative flex flex-row items-center ${className}`}
		>
			<div className="flex flex-grow flex-col">
				<div className="space-y-3.5">
					<Skeleton height={24} width={50} borderRadius={99} />
					<div className="block">
						<h2
							className={`nc-card-title block text-sm font-medium text-neutral-900 sm:text-base sm:font-semibold xl:text-lg dark:text-neutral-100`}
						>
							<Skeleton width="70%" />
						</h2>
						<div className="hidden sm:mt-2 sm:block">
							<div className="line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
								<Skeleton />
								<Skeleton width="90%" />
							</div>
						</div>
					</div>

					<div>
						<Skeleton width="40%" />
					</div>
				</div>
				<div className="mt-5">
					<PostCardLikeCommentSaveSkeleton />
				</div>
			</div>

			<div
				className={`z-0 mb-5 ms-3 block w-24 flex-shrink-0 overflow-hidden rounded-3xl sm:mb-0 sm:ms-6 sm:w-36 md:w-44 xl:w-56`}
			>
				<div className="aspect-h-1 aspect-w-1 relative block h-0 w-full">
					<Skeleton
						width="100%"
						height="100%"
						containerClassName="absolute inset-0 leading-none"
					/>
				</div>
			</div>
		</div>
	)
}

export default Card3Skeleton
