import { FC } from 'react'

export interface BackgroundSectionProps {
	className?: string
}

const BackgroundSection: FC<BackgroundSectionProps> = ({
	className = 'bg-neutral-100/70 dark:bg-black/20',
}) => {
	return (
		<div
			className={`absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transform xl:max-w-[1340px] xl:rounded-[40px] 2xl:max-w-screen-2xl ${className}`}
		>
			<span className="sr-only hidden">bg</span>
		</div>
	)
}

export default BackgroundSection
