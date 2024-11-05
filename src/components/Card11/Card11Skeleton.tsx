import { FC } from 'react'
import Skeleton from '../Skeleton/Skeleton'
import PostCardLikeCommentSaveSkeleton from '../Skeleton/PostCardLikeCommentSaveSkeleton'

export interface Card11SkeletonProps {
	className?: string
	ratio?: string
}

const Card11Skeleton: FC<Card11SkeletonProps> = ({
	className = 'h-full',
	ratio = 'aspect-w-4 aspect-h-3',
}) => {
	return (
		<div
			className={`nc-Card11 group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 ${className}`}
			//
		>
			<div
				className={`relative z-10 block w-full flex-shrink-0 overflow-hidden rounded-t-3xl ${ratio}`}
			>
				<div>
					<Skeleton
						width="100%"
						height="100%"
						containerClassName="absolute inset-0 leading-none"
					/>
				</div>
			</div>

			<div className="flex flex-col space-y-3 p-4">
				<Skeleton width="60%" />
				<h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
					<Skeleton />
				</h3>
				<PostCardLikeCommentSaveSkeleton />
			</div>
		</div>
	)
}

export default Card11Skeleton
