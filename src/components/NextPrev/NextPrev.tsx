'use client'
import { FC, useState } from 'react'

export interface NextPrevProps {
	className?: string
	btnClassName?: string
	onClickNext?: () => void
	onClickPrev?: () => void
	onlyNext?: boolean
	onlyPrev?: boolean
}

const NextPrev: FC<NextPrevProps> = ({
	className = '',
	onClickNext = () => {},
	onClickPrev = () => {},
	btnClassName = 'w-10 h-10',
	onlyNext = false,
	onlyPrev = false,
}) => {
	const [focus, setFocus] = useState<'left' | 'right'>('right')

	return (
		<div
			className={`nc-NextPrev relative flex items-center text-neutral-500 dark:text-neutral-400 ${className}`}
		>
			{!onlyNext && (
				<button
					className={`${btnClassName} ${
						!onlyPrev ? 'mr-2' : ''
					} flex items-center justify-center rounded-full border-neutral-200 dark:border-neutral-600 ${
						focus === 'left' ? 'border-2' : ''
					}`}
					onClick={e => {
						e.preventDefault()
						onClickPrev()
					}}
					title="Prev"
					onMouseEnter={() => setFocus('left')}
				>
					<svg
						className="h-5 w-5 rtl:rotate-180"
						viewBox="0 0 24 24"
						fill="none"
					>
						<path
							d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M20.5 12H3.67004"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			)}
			{!onlyPrev && (
				<button
					className={`${btnClassName} flex items-center justify-center rounded-full border-neutral-200 dark:border-neutral-600 ${
						focus === 'right' ? 'border-2' : ''
					}`}
					onClick={e => {
						e.preventDefault()
						onClickNext()
					}}
					title="Next"
					onMouseEnter={() => setFocus('right')}
				>
					<svg
						className="h-5 w-5 rtl:rotate-180"
						viewBox="0 0 24 24"
						fill="none"
					>
						<path
							d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M3.5 12H20.33"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			)}
		</div>
	)
}

export default NextPrev
