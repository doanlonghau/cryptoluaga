import { FC } from 'react'
import Skeleton from '../Skeleton/Skeleton'

export interface Props {
	className?: string
}

const Card3SmallSkeleton: FC<Props> = ({ className = 'h-full' }) => {
	return (
		<div
			className={`nc-Card3Small relative flex flex-row items-center justify-between ${className}`}
		>
			<div className="relative flex-1 space-y-2">
				<Skeleton width={150} />
				<h2 className="nc-card-title block text-sm font-medium text-neutral-900 sm:text-base sm:font-semibold dark:text-neutral-100">
					<Skeleton width={'80%'} />
				</h2>
			</div>

			<div
				className={`group relative z-0 ms-4 w-20 flex-shrink-0 overflow-hidden rounded-lg`}
			>
				<div className={`aspect-h-1 aspect-w-1 h-0 w-full`}>
					<Skeleton
						width={'100%'}
						height={'100%'}
						className="absolute inset-0"
					/>
				</div>
			</div>
		</div>
	)
}

export default Card3SmallSkeleton
