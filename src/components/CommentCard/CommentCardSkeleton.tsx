import { FC } from 'react'
import Skeleton from '../Skeleton/Skeleton'

export interface Props {
	className?: string
	size?: 'large' | 'normal'
}

const CommentCardSkeleton: FC<Props> = ({ className = '', size = 'large' }) => {
	return (
		<>
			<div
				className={`nc-CommentCard flex gap-[6px] sm:gap-[12px] ${className}`}
			>
				<Skeleton circle width={30} height={30} />

				<div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-200 p-2 text-sm sm:p-4 sm:text-base dark:border-neutral-700">
					{/* AUTHOR INFOR */}
					<div className="space-y-1">
						<div className="relative flex items-center">
							<div className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100">
								<Skeleton width={100} />
							</div>

							<span className="mx-2"></span>
							<span className="line-clamp-1 text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
								<Skeleton width={50} />
							</span>
						</div>
					</div>

					{/* CONTENT */}
					<div className="mb-3 mt-2 block max-w-none sm:mb-4 sm:mt-3">
						<Skeleton width={'95%'} />
						<Skeleton width={'70%'} />
					</div>

					<div className="flex space-x-2">
						<Skeleton width={80} height={30} borderRadius={99} />
					</div>
				</div>
			</div>
		</>
	)
}

export default CommentCardSkeleton
