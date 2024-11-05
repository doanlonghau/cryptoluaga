import { HTMLAttributes } from 'react'

export interface Heading2Props extends HTMLAttributes<HTMLHeadingElement> {
	emoji?: string
}

const Heading2: React.FC<Heading2Props> = ({
	children,
	emoji = '',
	className = 'justify-center',
	...args
}) => {
	return (
		<h2
			className={`flex items-center text-3xl font-semibold leading-[115%] text-neutral-900 md:text-5xl md:leading-[115%] dark:text-neutral-100 ${className}`}
			{...args}
		>
			{!!emoji && (
				<span className="mr-4 text-2xl leading-none md:text-3xl lg:text-4xl">
					{emoji}
				</span>
			)}
			{children || `Heading2 Title`}
		</h2>
	)
}

export default Heading2
