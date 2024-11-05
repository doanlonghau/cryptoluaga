import { FC } from 'react'
import Skeleton from '../Skeleton/Skeleton'

export interface CardCategory1SkeletonProps {
	className?: string
	size?: 'large' | 'normal'
}

const CardCategory1Skeleton: FC<CardCategory1SkeletonProps> = ({
	className = '',
	size = 'normal',
}) => {
	return (
		<div
			className={`nc-CardCategory1Skeleton flex items-center rounded-2xl border border-neutral-100 p-2.5 pr-3 dark:border-neutral-700 ${className}`}
		>
			<div
				className={`relative flex-shrink-0 ${
					size === 'large' ? 'h-20 w-20' : 'h-12 w-12'
				} me-4 overflow-hidden rounded-xl`}
			>
				<Skeleton
					containerClassName="absolute inset-0 leading-none"
					width="100%"
					height="100%"
				/>
			</div>

			<div className="flex-1">
				<h2
					className={`${
						size === 'large' ? 'text-lg' : 'text-base'
					} nc-card-title text-sm font-medium text-neutral-900 sm:text-base sm:font-semibold dark:text-neutral-100`}
				>
					<Skeleton width="90%" />
				</h2>
				<span
					className={`${
						size === 'large' ? 'text-sm' : 'text-xs'
					} mt-[2px] block text-neutral-500 dark:text-neutral-400`}
				>
					<Skeleton width="60%" />
				</span>
			</div>
		</div>
	)
}

export default CardCategory1Skeleton
