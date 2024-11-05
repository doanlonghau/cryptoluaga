'use client'

import React from 'react'
import ButtonClose from '@/components/ButtonClose/ButtonClose'
import Logo from '@/components/Logo/Logo'
import { Disclosure } from '@headlessui/react'
import { NavItemType } from './NavigationItem'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import MyImage from '../MyImage'
import { FragmentType } from '@/__generated__'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { flatListToHierarchical } from '@faustwp/core'
import { useRouter } from 'next/router'
import { SearchIcon } from '../Icons/Icons'

export interface NavMobileProps {
	menuItems: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>[]
	onClickClose?: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({
	menuItems: menuItemsProp,
	onClickClose,
}) => {
	const router = useRouter()
	const menuItems = flatListToHierarchical(menuItemsProp, {
		idKey: 'id',
		parentKey: 'parentId',
		childrenKey: 'children',
	})

	const _renderMenuChild = (
		item: NavItemType,
		itemClass = ' ps-3 text-neutral-700 dark:text-neutral-300 font-medium ',
	) => {
		return (
			<ul className="nav-mobile-sub-menu relative pb-1 ps-6 text-base">
				<div className="absolute bottom-2 start-4 top-2 border-s-2 border-neutral-100 dark:border-neutral-700" />
				{item.children?.map((i, index) => (
					<Disclosure key={index} as="li">
						<Link
							href={{
								pathname: i.uri || '',
							}}
							className={`mt-0.5 flex rounded-lg pe-4 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 ${itemClass}`}
						>
							<span
								className={`py-2.5 ${!i.children ? 'block w-full' : ''}`}
								onClick={onClickClose}
							>
								{i.label}
							</span>
							{!!i.children?.length && (
								<span
									className="flex flex-grow items-center"
									onClick={e => e.preventDefault()}
								>
									<Disclosure.Button
										as="span"
										className="flex flex-grow justify-end"
									>
										<ChevronDownIcon
											className="ms-2 h-4 w-4 text-neutral-500"
											aria-hidden="true"
										/>
									</Disclosure.Button>
								</span>
							)}
						</Link>
						{!!i.children?.length && (
							<Disclosure.Panel>
								{_renderMenuChild(
									i,
									'ps-3 text-neutral-600 dark:text-neutral-400 ',
								)}
							</Disclosure.Panel>
						)}
					</Disclosure>
				))}
			</ul>
		)
	}

	const _renderItem = (item: NavItemType, index: number) => {
		return (
			<Disclosure
				key={index}
				as="li"
				className="text-neutral-900 dark:text-white"
				defaultOpen={!index}
			>
				<Link
					className="flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium uppercase tracking-wide hover:bg-neutral-100 dark:hover:bg-neutral-800"
					href={{
						pathname: item.uri || '',
					}}
				>
					<span
						className={!item.children ? 'block w-full' : ''}
						onClick={onClickClose}
					>
						{item.label}
					</span>
					{!!item.children?.length && (
						<span className="block flex-grow" onClick={e => e.preventDefault()}>
							<Disclosure.Button
								as="span"
								className="flex flex-grow justify-end"
							>
								<ChevronDownIcon
									className="ms-2 h-4 w-4 text-neutral-500"
									aria-hidden="true"
								/>
							</Disclosure.Button>
						</span>
					)}
				</Link>
				{!!item.children?.length && (
					<Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
				)}
			</Disclosure>
		)
	}

	const renderSearchForm = () => {
		return (
			<form
				onSubmit={e => {
					e.preventDefault()
					router.push('/search/posts/' + e.currentTarget.mbsearch.value || '')
				}}
				className="flex-1 text-neutral-900 dark:text-neutral-200"
			>
				<div className="relative flex h-full rounded-xl bg-neutral-50 dark:bg-neutral-800">
					<input
						type="search"
						name="mbsearch"
						id="mbsearch"
						placeholder="Type and press enter"
						className="w-full flex-1 border-none bg-transparent py-3.5 pe-10 text-sm focus:outline-none focus:ring-0"
					/>

					<button
						type="submit"
						className="absolute inset-y-0 end-0 py-2 pe-4 ps-2"
					>
						<SearchIcon className="h-5 w-5" />
					</button>
				</div>
			</form>
		)
	}

	return (
		<div className="h-screen w-full transform divide-y-2 divide-neutral-100 overflow-y-auto bg-white py-2 shadow-lg ring-1 transition dark:divide-neutral-800 dark:bg-black dark:ring-neutral-700">
			<div className="px-5 py-6">
				<span className="absolute end-2 top-2 p-1">
					<ButtonClose onClick={onClickClose} />
				</span>

				<Logo />

				<div className="mt-5 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
					{NC_SITE_SETTINGS.mobile_nav_sidebar?.description}
				</div>

				<div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
					{NC_SITE_SETTINGS.site_socials?.map(item => (
						<a
							key={item?.name}
							href={item?.url}
							className="relative block"
							target="_blank"
							rel="noreferrer"
						>
							<span className="sr-only">{item?.name}</span>
							<span className="absolute -inset-1 hidden rounded-full bg-neutral-400 dark:block"></span>

							<MyImage
								width={22}
								height={22}
								className="max-h-[22px] opacity-60 hover:opacity-100"
								src={item?.icon || ''}
								alt={item?.name || ''}
							/>
						</a>
					))}
				</div>

				<div className="mt-7">{renderSearchForm()}</div>
			</div>
			<ul className="flex flex-col space-y-1 px-2 py-6 rtl:space-x-reverse">
				{menuItems?.map((item, index) =>
					_renderItem(item as NavItemType, index),
				)}
			</ul>
		</div>
	)
}

export default NavMobile
