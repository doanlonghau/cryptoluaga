'use client'

import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { FC, Fragment, useState } from 'react'
import Link from 'next/link'
import NcImage from '../NcImage/NcImage'
import { FragmentType, useFragment } from '@/__generated__'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import {
	NcPrimaryMenuFieldsFragmentFragment,
	NcmazFcPostCardFieldsFragment,
} from '@/__generated__/graphql'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import ncFormatDate from '@/utils/formatDate'

export type NavItemType = NcPrimaryMenuFieldsFragmentFragment & {
	children?: NavItemType[]
}

export interface NavigationItemProps {
	menuItem: FragmentType<typeof NC_PRIMARY_MENU_QUERY_FRAGMENT>
}

const NavigationItem: FC<NavigationItemProps> = ({
	menuItem: menuItemProp,
}) => {
	const menuItem = useFragment(NC_PRIMARY_MENU_QUERY_FRAGMENT, menuItemProp)

	const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([])

	const onMouseEnterMenu = (id: string) => {
		setMenuCurrentHovers((state) => [...state, id])
	}

	const onMouseLeaveMenu = (id: string) => {
		setMenuCurrentHovers((state) => {
			return state.filter((item, index) => {
				return item !== id && index < state.indexOf(id)
			})
		})
	}

	// ===================== MENU MEGAMENU =====================
	const renderMegaMenu = (menu: NavItemType) => {
		if (!menu.children?.length && !menu.ncmazfaustMenu?.posts?.nodes.length) {
			return null
		}

		let rightSideClass = 'w-[40%]'
		let postsColumns = 2
		const colColumns = menu.ncmazfaustMenu?.numberOfMenuColumns || 0

		if (colColumns === 0) {
			rightSideClass = 'w-[100%]'
			postsColumns = 5
		} else if (colColumns === 1) {
			rightSideClass = 'w-[80%]'
			postsColumns = 4
		} else if (colColumns === 2) {
			rightSideClass = 'w-[60%]'
			postsColumns = 3
		} else if (colColumns === 3 || colColumns === 4) {
			rightSideClass = 'w-[40%]'
			postsColumns = 2
		} else if (colColumns === 5) {
			rightSideClass = 'w-[20%]'
			postsColumns = 1
		} else if (colColumns >= 6) {
			rightSideClass = 'w-[0%] hidden'
			postsColumns = 0
		}

		return (
			<li
				className={`menu-item menu-megamenu menu-megamenu--large flex-shrink-0 ${menu.cssClasses?.join(
					' ',
				)}`}
			>
				{renderMainItem(menu)}

				<div className="sub-menu hiddenScrollbar invisible absolute inset-x-0 top-full z-50 max-h-[70vh] transform overflow-auto">
					<div className="bg-white shadow-lg dark:bg-neutral-900">
						<div className="container">
							<div className="flex items-start gap-6 border-t border-neutral-200 py-14 text-sm xl:gap-8 dark:border-neutral-700">
								<div
									className={`grid flex-1 grid-cols-${colColumns} gap-6 ${
										colColumns === 0 ? 'hidden' : ''
									}`}
								>
									{menu.children?.map((item, index) => (
										<div key={index} className={item.cssClasses?.join(' ')}>
											<Link
												href={item.uri || ''}
												className="font-medium text-neutral-900 dark:text-neutral-200"
											>
												{item.label}
											</Link>
											<ul className="mt-4 grid space-y-4">
												{item.children?.map(renderMegaMenuNavlink)}
											</ul>
										</div>
									))}
								</div>
								<div className={rightSideClass}>
									<div
										className={`grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-${postsColumns}`}
									>
										<h3 className="sr-only">Recent posts</h3>
										{menu.ncmazfaustMenu?.posts?.nodes.map((p) => {
											if (p.__typename !== 'Post') return null
											const post = getPostDataFromPostFragment(
												p as NcmazFcPostCardFieldsFragment,
											)

											return (
												<article
													key={post.databaseId}
													className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
												>
													<div className="relative flex-none">
														<NcImage
															containerClassName="aspect-[2/1] w-full rounded-xl bg-neutral-100 sm:aspect-[16/9] sm:h-32 lg:h-auto z-0"
															fill
															className="rounded-xl object-cover"
															src={post.featuredImage?.sourceUrl || ''}
															sizes="300px"
															alt={post.title || ''}
														/>
														<div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-neutral-900/10" />
													</div>
													<div>
														<div className="flex flex-wrap items-center gap-1 xl:gap-x-4">
															<time
																dateTime={post.date}
																className="text-xs leading-6 text-neutral-500 dark:text-neutral-400"
															>
																{ncFormatDate(post.date)}
															</time>
															<Link
																href={post.categories?.nodes?.[0].uri || ''}
																className="relative z-10 rounded-full bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100"
															>
																{post.categories?.nodes?.[0].name || ''}
															</Link>
														</div>
														<h4 className="mt-2 text-sm font-semibold leading-6 text-neutral-900">
															<Link href={post.uri}>
																<span className="absolute inset-0" />
																{post.title}
															</Link>
														</h4>
														<div className="mt-2 break-words text-sm leading-6 text-neutral-500 dark:text-neutral-400">
															<span
																className="line-clamp-3"
																dangerouslySetInnerHTML={{
																	__html: post.excerpt,
																}}
															></span>
														</div>
													</div>
												</article>
											)
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</li>
		)
	}

	const renderMegaMenuNavlink = (item: NavItemType) => {
		return (
			<li key={item.id} className={`${item.cssClasses?.join(' ')}`}>
				<Link
					className="font-normal text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
					href={{
						pathname: item.uri || '',
					}}
				>
					{item.label}
				</Link>
			</li>
		)
	}

	// ===================== MENU DROPDOW =====================
	const renderDropdownMenu = (menuDropdown: NavItemType) => {
		const isHover = menuCurrentHovers.includes(menuDropdown.id)
		return (
			<Popover
				as="li"
				className={`menu-item menu-dropdown relative shrink-0 ${menuDropdown.cssClasses?.join(
					' ',
				)}`}
				onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
				onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
			>
				{() => (
					<>
						<PopoverButton as={Fragment}>
							{renderMainItem(menuDropdown)}
						</PopoverButton>
						<Transition
							as={Fragment}
							show={isHover && !!menuDropdown?.children?.length}
							enter="transition ease-out duration-150"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel
								static
								className="sub-menu absolute left-0 top-full z-10 w-56 transform"
							>
								<ul className="relative grid space-y-1 rounded-2xl bg-white py-3 text-sm shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-900 dark:ring-white dark:ring-opacity-10">
									{menuDropdown.children?.map((i) => {
										if (i.children?.length) {
											return renderDropdownMenuNavlinkHasChild(i)
										} else {
											return (
												<li
													key={i.id}
													className={`px-2 ${i.cssClasses?.join(' ')}`}
												>
													{renderDropdownMenuNavlink(i)}
												</li>
											)
										}
									})}
								</ul>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
		const isHover = menuCurrentHovers.includes(item.id)
		return (
			<Popover
				as="li"
				key={item.id}
				className={`menu-item menu-dropdown relative px-2 ${item.cssClasses?.join(
					' ',
				)}`}
				onMouseEnter={() => onMouseEnterMenu(item.id)}
				onMouseLeave={() => onMouseLeaveMenu(item.id)}
			>
				{() => (
					<>
						<PopoverButton as={Fragment}>
							{renderDropdownMenuNavlink(item)}
						</PopoverButton>
						<Transition
							as={Fragment}
							show={isHover && !!item.children?.length}
							enter="transition ease-out duration-150"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel
								static
								className="sub-menu absolute left-full top-0 z-10 w-56 pl-2"
							>
								<ul className="relative grid space-y-1 rounded-xl bg-white py-3 text-sm shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-900 dark:ring-white dark:ring-opacity-10">
									{item.children?.map((i) => {
										if (i.children?.length) {
											return renderDropdownMenuNavlinkHasChild(i)
										} else {
											return (
												<li
													key={i.id}
													className={`px-2 ${i.cssClasses?.join(' ')}`}
												>
													{renderDropdownMenuNavlink(i)}
												</li>
											)
										}
									})}
								</ul>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderDropdownMenuNavlink = (item: NavItemType) => {
		return (
			<Link
				className="flex items-center rounded-md px-4 py-2 font-normal text-neutral-600 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
				href={{
					pathname: item.uri || '',
				}}
			>
				{item.label}
				{item.children?.length ? (
					<ChevronDownIcon
						className="ms-2 h-4 w-4 text-neutral-500"
						aria-hidden="true"
					/>
				) : null}
			</Link>
		)
	}

	// ===================== MENU MAIN MENU =====================
	const renderMainItem = (item: NavItemType) => {
		const isLink = !item.children?.length && !item.ncmazfaustMenu?.isMegaMenu
		const ItemC = isLink ? Link : 'div'
		return (
			<div className="nc-menu-lv1 flex h-20 flex-shrink-0 items-center">
				<ItemC
					className="relative inline-flex cursor-pointer items-center rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 xl:px-5 2xl:text-[15px] dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
					href={isLink ? item.uri || '' : ''}
				>
					{item.label}
					{item.children?.length ? (
						<ChevronDownIcon
							className="-me-1 ms-1 h-4 w-4 text-neutral-400"
							aria-hidden="true"
						/>
					) : null}
				</ItemC>
			</div>
		)
	}

	if (menuItem.ncmazfaustMenu?.isMegaMenu) {
		return renderMegaMenu(menuItem)
	}
	return renderDropdownMenu(menuItem)
}

export default NavigationItem
