import {
	CategoriesIcon,
	PostSearchIcon,
	UserSearchIcon,
} from '@/components/Icons/Icons'
import getTrans from '@/utils/getTrans'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'

interface TabProps {
	currentTab: 'posts' | 'categories' | 'authors'
	search: string
}

const T = getTrans()
const TABS: {
	tab: TabProps['currentTab']
	label: string
	svgIcon: React.JSX.Element
}[] = [
	{
		tab: 'posts',
		label: T['Articles'],
		svgIcon: <PostSearchIcon className="mb-2.5 h-7 w-7" />,
	},
	{
		tab: 'categories',
		label: T['Categories'],
		svgIcon: <CategoriesIcon className="mb-2.5 h-7 w-7" />,
	},
	{
		tab: 'authors',
		label: T['Authors'],
		svgIcon: <UserSearchIcon className="mb-2.5 h-7 w-7" />,
	},
]

const Tab: FC<TabProps> = ({ currentTab, search }) => {
	const [activeTab, setActiveTab] = useState(currentTab)
	useEffect(() => {
		setActiveTab(currentTab)
	}, [currentTab])

	return (
		<div className="flex overflow-hidden">
			<ul className="inline-flex gap-x-8 text-sm font-medium sm:gap-x-10 xl:gap-x-12">
				{TABS.map(item => {
					const isActive = item.tab == (activeTab || '')
					return (
						<li key={item.tab}>
							<Link
								href={`/search/${item.tab}/${search}`}
								className={`group relative flex w-full flex-col items-center py-4 ${
									isActive
										? 'text-neutral-900 dark:text-neutral-50'
										: 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
								}`}
								onClick={() => setActiveTab(item.tab)}
								scroll={false}
							>
								{item.svgIcon}
								{item.label}
								<div
									className={`absolute inset-x-0 bottom-0 border-b-2 transition-opacity ${
										isActive
											? 'border-neutral-900 dark:border-neutral-50'
											: 'border-neutral-300 opacity-0 group-hover:opacity-100 dark:border-neutral-700'
									}`}
								></div>
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Tab
