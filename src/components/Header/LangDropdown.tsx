'use client'

import { Popover, Tab, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { FC, Fragment } from 'react'

export const headerLanguage = [
	{
		id: 'English',
		name: 'English',
		description: 'United State',
		href: '##',
		active: true,
	},
	{
		id: 'Vietnamese',
		name: 'Vietnamese',
		description: 'Vietnamese',
		href: '##',
	},
	{
		id: 'Francais',
		name: 'Francais',
		description: 'Belgique',
		href: '##',
	},
	{
		id: 'Francais',
		name: 'Francais',
		description: 'Canada',
		href: '##',
	},
	{
		id: 'Francais',
		name: 'Francais',
		description: 'Belgique',
		href: '##',
	},
	{
		id: 'Francais',
		name: 'Francais',
		description: 'Canada',
		href: '##',
	},
]

interface LangDropdownProps {
	className?: string
	panelClassName?: string
	variation?: 'type1' | 'type2'
}

const LangDropdown: FC<LangDropdownProps> = ({
	panelClassName = '',
	className = 'hidden md:block ',
	variation = 'type1',
}) => {
	const renderLang = (close: () => void) => {
		return (
			<div className="grid gap-8 lg:grid-cols-2">
				{headerLanguage.map((item, index) => (
					<a
						key={index}
						href={item.href}
						onClick={() => close()}
						className={`-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700 ${
							item.active ? 'bg-gray-100 dark:bg-gray-700' : 'opacity-80'
						}`}
					>
						<div className="">
							<p className="text-sm font-medium">{item.name}</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								{item.description}
							</p>
						</div>
					</a>
				))}
			</div>
		)
	}

	const renderMenu = (open: boolean) => {
		if (variation === 'type1') {
			return (
				<Popover.Button
					className={` ${open ? '' : 'text-opacity-80'} group inline-flex h-10 items-center px-3 py-1.5 text-sm font-medium text-gray-800 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:h-12 dark:text-neutral-200`}
				>
					<GlobeAltIcon className="h-[18px] w-[18px] opacity-80" />
					<span className="ms-2">Language</span>
					<ChevronDownIcon
						className={`${open ? '-rotate-180' : 'text-opacity-70'} ms-1 h-4 w-4 transition duration-150 ease-in-out group-hover:text-opacity-80`}
						aria-hidden="true"
					/>
				</Popover.Button>
			)
		}
		return (
			<Popover.Button
				className={`relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none sm:h-12 sm:w-12 dark:text-neutral-300 dark:hover:bg-neutral-800`}
			>
				<GlobeAltIcon className="h-6 w-6 opacity-80" />
			</Popover.Button>
		)
	}

	return (
		<div className={`LangDropdown ${className}`}>
			<Popover className="relative">
				{({ open, close }) => (
					<>
						{renderMenu(open)}
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel
								className={`absolute end-0 z-20 mt-3.5 w-80 ${panelClassName}`}
							>
								<div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-800">
									{renderLang(close)}
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	)
}
export default LangDropdown
