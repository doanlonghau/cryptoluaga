import React, { FC } from 'react'

export interface RadioProps {
	className?: string
	name: string
	id: string
	onChange?: (value: string) => void
	defaultChecked?: boolean
	sizeClassName?: string
	label?: string
}

const Radio: FC<RadioProps> = ({
	className = '',
	name,
	id,
	onChange,
	label,
	sizeClassName = 'w-6 h-6',
	defaultChecked,
}) => {
	return (
		<div className={`flex items-center text-sm sm:text-base ${className}`}>
			<input
				id={id}
				name={name}
				type="radio"
				className={`focus:ring-action-primary rounded-full border-slate-400 bg-transparent text-primary-500 hover:border-slate-700 focus:ring-primary-500 dark:border-slate-700 dark:checked:bg-primary-500 dark:hover:border-slate-500 ${sizeClassName}`}
				onChange={(e) => onChange && onChange(e.target.value)}
				defaultChecked={defaultChecked}
				value={id}
			/>
			{label && (
				<label
					htmlFor={id}
					className="block select-none pl-2.5 text-slate-900 sm:pl-3 dark:text-slate-100"
					dangerouslySetInnerHTML={{ __html: label }}
				></label>
			)}
		</div>
	)
}

export default Radio
