import twFocusClass from '@/utils/twFocusClass'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ButtonHTMLAttributes, FC } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PrevBtn: FC<Props> = ({ className = 'w-10 h-10 text-lg', ...args }) => {
	return (
		<button
			className={`PrevBtn ${className} inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-500 ${twFocusClass()}`}
			{...args}
		>
			<ChevronLeftIcon className="h-5 w-5 rtl:rotate-180" />
		</button>
	)
}

export default PrevBtn
