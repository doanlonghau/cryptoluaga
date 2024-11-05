import { FC } from 'react'

export interface BgGlassmorphismProps {
	className?: string
}

const BgGlassmorphism: FC<BgGlassmorphismProps> = ({
	className = 'absolute inset-x-0 top-0 min-h-0 ps-10 py-32 flex flex-col overflow-hidden z-[-1]',
}) => {
	return (
		<div
			className={`nc-BgGlassmorphism ${className}`}
			data-nc-id="BgGlassmorphism"
		>
			<span className="lg:h-9w-96 h-80 w-80 rounded-full bg-[#ef233c] opacity-20 mix-blend-multiply blur-3xl filter lg:w-96" />
			<span className="lg:h-9w-96 nc-animation-delay-2000 -mt-10 ms-10 h-80 w-80 rounded-full bg-[#04868b] opacity-20 mix-blend-multiply blur-3xl filter lg:w-96" />
		</div>
	)
}

export default BgGlassmorphism
