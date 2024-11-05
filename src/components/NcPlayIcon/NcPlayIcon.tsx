import { FC } from 'react'

export interface NcPlayIconProps {
	className?: string
}

const NcPlayIcon: FC<NcPlayIconProps> = ({ className = '' }) => {
	return (
		<div
			className={`nc-NcPlayIcon h-20 w-20 rounded-full bg-white bg-opacity-30 p-3 backdrop-blur backdrop-filter lg:h-52 lg:w-52 lg:p-12 ${className}`}
		>
			<div className="relative h-full w-full rounded-full bg-white text-primary-500">
				<span className="absolute inset-0 flex items-center justify-center">
					<svg
						className="h-8 w-8 md:h-12 md:w-12 rtl:rotate-180"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1.5"
							d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
						></path>
					</svg>
				</span>
			</div>
		</div>
	)
}

export default NcPlayIcon
