import { ButtonHTMLAttributes } from 'react'
import twFocusClass from '@/utils/twFocusClass'

export interface ButtonCircleProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: string
}

const ButtonCircle: React.FC<ButtonCircleProps> = ({
	className = ' ',
	size = ' w-9 h-9 ',
	...args
}) => {
	return (
		<button
			className={
				`ttnc-ButtonCircle flex items-center justify-center rounded-full bg-neutral-900 !leading-none text-neutral-50 hover:bg-neutral-800 disabled:bg-opacity-70 ${className} ${size} ` +
				twFocusClass(true)
			}
			{...args}
		/>
	)
}

export default ButtonCircle
