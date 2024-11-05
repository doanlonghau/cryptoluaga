import React, { FC } from 'react'

export interface CheckboxProps {
	label?: string
	subLabel?: string
	className?: string
	sizeClassName?: string
	labelClassName?: string
	name: string
	defaultChecked?: boolean
	onChange?: (checked: boolean) => void
}

const Checkbox: FC<CheckboxProps> = ({
	subLabel = '',
	label = '',
	name,
	className = '',
	sizeClassName = 'w-6 h-6',
	labelClassName = '',
	defaultChecked,
	onChange,
}) => {
	return (
		<div className={`flex text-sm sm:text-base ${className}`}>
			<input
				id={name}
				name={name}
				type="checkbox"
				className={`focus:ring-action-primary rounded border-slate-400 bg-transparent text-primary-500 hover:border-slate-700 focus:ring-primary-500 dark:border-slate-700 dark:checked:bg-primary-500 dark:hover:border-slate-500 ${sizeClassName}`}
				defaultChecked={defaultChecked}
				onChange={(e) => onChange && onChange(e.target.checked)}
			/>
			{label && (
				<label
					htmlFor={name}
					className="flex flex-1 select-none flex-col justify-center pl-2.5 sm:pl-3.5"
				>
					<span
						className={`text-slate-900 dark:text-slate-100 ${labelClassName} ${
							!!subLabel ? '-mt-0.5' : ''
						}`}
					>
						{label}
					</span>
					{subLabel && (
						<p className="mt-0.5 text-sm font-light text-slate-500 dark:text-slate-400">
							{subLabel}
						</p>
					)}
				</label>
			)}
		</div>
	)
}

export default Checkbox
