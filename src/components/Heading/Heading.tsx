import { HTMLAttributes, ReactNode } from 'react'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	fontClass?: string
	desc?: ReactNode
	isCenter?: boolean
}

const Heading: React.FC<HeadingProps> = ({
	children,
	desc = 'Discover the most outstanding articles in all topics of life. ',
	className = 'mb-10 md:mb-11 text-neutral-900 dark:text-neutral-100',
	isCenter = false,
	...args
}) => {
	return (
		<div
			className={`nc-Section-Heading relative flex flex-col justify-between sm:flex-row sm:items-end ${className}`}
		>
			<div
				className={
					isCenter ? 'mx-auto w-full max-w-2xl text-center' : 'max-w-2xl'
				}
			>
				<h2
					className={`text-xl font-semibold sm:text-2xl md:text-3xl lg:text-3xl`}
					{...args}
				>
					{children || `Section Heading`}
				</h2>
				{desc && (
					<span className="mt-2 block text-base font-normal text-neutral-500 sm:text-lg md:mt-3 dark:text-neutral-400">
						{desc}
					</span>
				)}
			</div>
		</div>
	)
}

export default Heading
