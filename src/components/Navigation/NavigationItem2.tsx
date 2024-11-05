'use client'

import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { FC, Fragment } from 'react'
import Link from 'next/link'
import NcImage from '../NcImage/NcImage'
import { useFragment } from '@/__generated__'
import { NC_PRIMARY_MENU_QUERY_FRAGMENT } from '@/fragments/menu'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import ncFormatDate from '@/utils/formatDate'
import { NavItemType, NavigationItemProps } from './NavigationItem'
import { NcmazFcPostCardFieldsFragment } from '@/__generated__/graphql'

export interface Props extends NavigationItemProps {}

const NavigationItem2: FC<Props> = ({ menuItem: menuItemProp }) => {
	const menuItem = useFragment(NC_PRIMARY_MENU_QUERY_FRAGMENT, menuItemProp)

	// ===================== MENU MEGAMENU =====================
	const renderMegaMenu = (menu: NavItemType) => {
		if (!menu.children?.length && !menu.ncmazfaustMenu?.posts?.nodes.length) {
			return null
		}

		let rightSideClass = ''
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
			rightSideClass = 'w-[44%]'
			postsColumns = 2
		} else if (colColumns === 5) {
			rightSideClass = 'w-[20%]'
			postsColumns = 1
		} else if (colColumns >= 6) {
			rightSideClass = 'w-[0%] hidden'
			postsColumns = 0
		}

		return (
			<Popover className="">
				{({ open, close }) => {
					return (
						<div className={menu.cssClasses?.join(' ')}>
							<>{renderPopoverButtonCommon(menu, open)}</>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<PopoverPanel
									as="div"
									className="absolute inset-x-0 top-0 -z-10 w-full pt-16 sm:pt-20"
								>
									<div className="hiddenScrollbar max-h-[80vh] overflow-auto bg-white shadow-lg dark:bg-neutral-900">
										<div className="container">
											<div className="flex items-start gap-6 border-t border-neutral-200 py-14 text-sm dark:border-neutral-700">
												<div
													className={`grid flex-1 grid-cols-${colColumns} gap-6 ${
														colColumns === 0 ? 'hidden' : ''
													}`}
												>
													{menu.children?.map((item, index) => (
														<div
															key={index}
															className={item.cssClasses?.join(' ')}
														>
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
														className={`grid grid-cols-1 gap-8 sm:gap-6 lg:grid-cols-${postsColumns}`}
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
																				href={
																					post.categories?.nodes?.[0]?.uri || ''
																				}
																				className="relative z-10 rounded-full bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800/80"
																			>
																				{post.categories?.nodes?.[0]?.name ||
																					''}
																			</Link>
																		</div>
																		<h4 className="mt-2 text-sm font-medium leading-6 text-neutral-900 dark:text-neutral-300">
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
								</PopoverPanel>
							</Transition>
						</div>
					)
				}}
			</Popover>
		)
	}

	const renderMegaMenuNavlink = (item: NavItemType) => {
		return (
			<li key={item.id} className={item.cssClasses?.join(' ')}>
				<Link
					className="font-normal text-neutral-600 hover:text-black focus:outline-none focus:ring-0 dark:text-neutral-400 dark:hover:text-white"
					href={{
						pathname: item.uri || '/',
					}}
				>
					{item.label}
				</Link>
			</li>
		)
	}

	// ===================== MENU DROPDOW =====================
	const renderDropdownMenu = (menuDropdown: NavItemType) => {
		if (!menuDropdown.children?.length) {
			return (
				<li
					className={`relative focus:outline-none focus:ring-0 ${menuDropdown.cssClasses?.join(
						' ',
					)}`}
				>
					<>{renderPopoverButtonCommon(menuDropdown, false)}</>
				</li>
			)
		}

		return (
			<Popover
				as="li"
				className={`relative focus:outline-none focus:ring-0 ${menuDropdown.cssClasses?.join(
					' ',
				)}`}
			>
				{({ close, open }) => (
					<>
						<>{renderPopoverButtonCommon(menuDropdown, open)}</>
						{!!menuDropdown.children?.length && (
							<Transition
								as={Fragment}
								enter="transition ease-out duration-150"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<PopoverPanel className="absolute end-0 top-full z-20 mt-3.5 w-56">
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
						)}
					</>
				)}
			</Popover>
		)
	}

	const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
		return (
			<Popover
				as="li"
				className={`relative px-2 ${item.cssClasses?.join(' ')}`}
				key={item.id}
			>
				{() => (
					<>
						<PopoverButton as={Fragment}>
							{renderDropdownMenuNavlink(item)}
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-150"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute left-full top-0 z-10 w-56 pl-2">
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
				className="flex items-center rounded-md px-4 py-2 font-normal text-neutral-600 hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-0 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
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
	const renderPopoverButtonCommon = (menu: NavItemType, open: boolean) => {
		const isLink = !menu.children?.length && !menu.ncmazfaustMenu?.isMegaMenu

		const ItemC = isLink ? Link : PopoverButton

		return (
			<ItemC
				className={` ${open ? '' : 'text-opacity-80'} nc-menu-lv1 group relative inline-flex h-10 items-center px-3 py-1.5 text-sm font-medium text-neutral-800 hover:text-opacity-100 focus:outline-none focus-visible:ring-0 sm:h-12 dark:text-neutral-300`}
				href={isLink ? menu.uri || '' : ''}
			>
				<span className="">{menu.label}</span>
				{!isLink && (
					<ChevronDownIcon
						className={`${open ? '-rotate-180' : ''} ms-1 h-4 w-4 transition duration-150 ease-in-out`}
						aria-hidden="true"
					/>
				)}
			</ItemC>
		)
	}

	if (menuItem.ncmazfaustMenu?.isMegaMenu) {
		return renderMegaMenu(menuItem)
	}
	return renderDropdownMenu(menuItem)
}

export default NavigationItem2
