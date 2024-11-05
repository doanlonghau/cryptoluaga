'use client'

import { useEffect } from 'react'
import { Fragment, useState } from 'react'
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import Button from '../Button/Button'

export interface ArchiveFilterListBoxProps<
	T extends { name: string; value?: string },
> {
	className?: string
	lists: T[]
	onChange?: (value: T) => void
	defaultValue?: T
}

function ArchiveFilterListBox<T extends { name: string }>({
	className = '',
	lists,
	onChange,
	defaultValue,
}: ArchiveFilterListBoxProps<T>) {
	const [selected, setSelected] = useState(defaultValue || lists[0])

	useEffect(() => {
		setSelected(defaultValue || lists[0])
	}, [defaultValue?.name])

	return (
		<div className={`nc-ArchiveFilterListBox flex-shrink-0 ${className}`}>
			<Listbox
				value={selected}
				onChange={(value) => {
					setSelected(value)
					onChange && onChange(value)
				}}
				defaultValue={defaultValue}
			>
				<div className="relative">
					<ListboxButton as={'div'}>
						<Button pattern="third" fontSize="text-sm font-medium">
							<svg
								className="-ms-1.5 me-2 h-5 w-5"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.00999 20.5L3.98999 15.49"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M9.01001 3.5V20.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M14.99 3.5L20.01 8.51"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M14.99 20.5V3.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>

							{selected.name}
							<ChevronDownIcon
								className="-me-1 ms-2 h-4 w-4"
								aria-hidden="true"
							/>
						</Button>
					</ListboxButton>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<ListboxOptions className="absolute end-0 z-50 mt-2 max-h-96 w-52 overflow-auto rounded-xl bg-white py-1 text-sm text-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:text-neutral-200 dark:ring-neutral-700">
							{lists.map((item, index: number) => (
								<ListboxOption
									key={index}
									className={({ active }) =>
										`${
											active
												? 'bg-primary-50 text-primary-700 dark:bg-neutral-700 dark:text-neutral-200'
												: ''
										} relative cursor-default select-none py-2 pe-4 ps-10`
									}
									value={item}
								>
									{({ selected }) => (
										<>
											<span
												className={`${
													selected ? 'font-medium' : 'font-normal'
												} block truncate`}
											>
												{item.name}
											</span>
											{selected ? (
												<span className="absolute inset-y-0 start-0 flex items-center ps-3 text-primary-700 dark:text-neutral-200">
													<CheckIcon className="h-5 w-5" aria-hidden="true" />
												</span>
											) : null}
										</>
									)}
								</ListboxOption>
							))}
						</ListboxOptions>
					</Transition>
				</div>
			</Listbox>
		</div>
	)
}

export default ArchiveFilterListBox
