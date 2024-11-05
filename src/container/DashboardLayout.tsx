'use client'
import { Fragment, useState } from 'react'
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import {
	Bars3Icon,
	FolderIcon,
	LightBulbIcon,
	PowerIcon,
	UserCircleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Logo from '@/components/Logo/Logo'
import SwitchDarkMode from '@/components/SwitchDarkMode/SwitchDarkMode'
import AvatarDropdown from '@/components/Header/AvatarDropdown'
import classNames from '@/utils/classNames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLogout } from '@faustwp/core'
import CreateBtn from '@/components/Header/CreateBtn'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import getTrans from '@/utils/getTrans'
import { SearchIconBtn } from '@/components/Header/HeaderSearch'
const T = getTrans()

interface NavigationItem {
	name:
		| TDashBoardPostTab
		| TDashBoardEditProfileTab
		| 'posts'
		| 'edit profile'
		| 'documents'
	title: string
	href: string
	icon?: any
	children?: NavigationItem[]
}

export type TDashBoardPostTab =
	| 'published'
	| 'pending'
	| 'schedule'
	| 'draft'
	| 'trash'

export type TDashBoardEditProfileTab =
	| 'general'
	| 'profile'
	| 'password'
	| 'socials'
	| 'delete-account'

const navigation: NavigationItem[] = [
	{
		name: 'posts',
		title: T['Posts'],
		href: '/dashboard/posts/published',
		icon: FolderIcon,
		children: [
			{
				name: 'published',
				title: T['Published'],
				href: '/dashboard/posts/published',
			},
			{
				name: 'pending',
				title: T['Pending'],
				href: '/dashboard/posts/pending',
			},
			{
				name: 'schedule',
				title: T['Scheduled'],
				href: '/dashboard/posts/schedule',
			},
			{
				name: 'draft',
				title: T['Draft'],
				href: '/dashboard/posts/draft',
			},
			{
				name: 'trash',
				title: T['Trash'],
				href: '/dashboard/posts/trash',
			},
		],
	},

	{
		name: 'edit profile',
		title: T['Edit profile'],
		href: '/dashboard/edit-profile/general',
		icon: UserCircleIcon,
		children: [
			{
				name: 'general',
				title: T['General'],
				href: '/dashboard/edit-profile/general',
			},
			{
				name: 'profile',
				title: T['Profile'],
				href: '/dashboard/edit-profile/profile',
			},
			{
				name: 'password',
				title: T['Password'],
				href: '/dashboard/edit-profile/password',
			},
			{
				name: 'socials',
				title: T['Socials'],
				href: '/dashboard/edit-profile/socials',
			},
			{
				name: 'delete-account',
				title: T['Delete account'],
				href: '/dashboard/edit-profile/delete-account',
			},
		],
	},
	{
		name: 'documents',
		title: T['Documents'],
		href: NC_SITE_SETTINGS.document_page?.enable
			? NC_SITE_SETTINGS.document_page?.uri || ''
			: '',
		icon: LightBulbIcon,
	},
]

interface Props {
	children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const router = useRouter()
	const currentTab = router.query.tab || 'published'
	const { logout } = useLogout()

	const renderItem = (item: NavigationItem) => {
		const isCurrent = item.name === currentTab
		if (item.name === 'documents' && !item.href) {
			return null
		}

		return (
			<li key={item.name}>
				<Link
					href={item.href}
					className={classNames(
						isCurrent
							? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200'
							: 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-300',
						'group flex gap-x-3 rounded-md p-3 text-sm font-medium capitalize leading-6',
					)}
				>
					<item.icon
						className={classNames(
							isCurrent
								? 'text-primary-600 dark:text-neutral-100'
								: 'text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-neutral-200',
							'h-6 w-6 shrink-0',
						)}
						aria-hidden="true"
					/>
					{item.title}

					{/* render children */}
					{item.children && (
						<ChevronDownIcon
							className={classNames(
								isCurrent
									? 'text-primary-600 dark:text-neutral-100'
									: 'text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-neutral-200',
								'ms-auto h-5 w-5 group-hover:text-primary-600',
							)}
							aria-hidden="true"
						/>
					)}
				</Link>

				{/* render children */}
				{item.children && (
					<ul role="list" className="relative mt-1 space-y-1 ps-[32px]">
						<div className="absolute bottom-8 start-[22px] top-0 border-s border-neutral-200 dark:border-neutral-600"></div>

						{item.children.map(child => {
							const isCurrent = child.name === currentTab
							return (
								<li key={child.name} className="relative">
									<div className="absolute -start-[10px] top-2 h-4 w-4 rounded-lg rounded-e-none rounded-t-none border border-e-0 border-t-0 border-neutral-200 dark:border-neutral-600"></div>
									<Link
										href={child.href}
										className={classNames(
											isCurrent
												? 'bg-neutral-50 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200'
												: 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300',
											'group flex gap-x-3 rounded-md p-2.5 ps-4 text-sm font-medium leading-6',
										)}
									>
										{child.title}
									</Link>
								</li>
							)
						})}
					</ul>
				)}
			</li>
		)
	}

	const renderStaticSidebarForDesktop = () => {
		return (
			<div className="hiddenScrollbar flex grow flex-col gap-y-5 overflow-y-auto border-e border-neutral-200 bg-white px-6 pb-4 dark:border-neutral-600 dark:bg-neutral-900">
				<div className="flex shrink-0 items-center pt-5">
					<Logo />
				</div>
				<nav className="flex flex-1 flex-col">
					<ul role="list" className="flex flex-1 flex-col gap-y-7">
						<li>
							<ul role="list" className="-mx-2 space-y-1">
								{navigation.map(renderItem)}
							</ul>
						</li>

						<li className="mt-auto">
							<a
								href="#"
								className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
								onClick={e => {
									e.preventDefault()
									logout('/')
								}}
							>
								<PowerIcon
									className="h-6 w-6 shrink-0 text-neutral-400 group-hover:text-primary-600 dark:text-neutral-300 dark:group-hover:text-neutral-200"
									aria-hidden="true"
								/>
								{T['Sign out']}
							</a>
						</li>
					</ul>
				</nav>
			</div>
		)
	}

	const renderSearchForm = () => {
		return (
			<form
				className="relative hidden flex-1 lg:flex"
				action="#"
				onSubmit={e => {
					e.preventDefault()
					const search = e.currentTarget.search.value
					router.push(`/search/posts/${search}`)
				}}
			>
				<label htmlFor="search-field" className="sr-only">
					Search
				</label>
				<MagnifyingGlassIcon
					className="pointer-events-none absolute inset-y-0 start-0 h-full w-5 text-neutral-400"
					aria-hidden="true"
				/>
				<input
					id="search-field"
					className="block h-full w-full border-0 bg-transparent py-0 pe-0 ps-8 text-neutral-900 placeholder:text-neutral-400 focus:ring-0 sm:text-sm dark:text-white"
					placeholder="Search..."
					type="search"
					name="search"
				/>
			</form>
		)
	}

	return (
		<>
			<div className="bg-white dark:bg-neutral-800">
				<Transition show={sidebarOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-50 lg:hidden"
						onClose={setSidebarOpen}
					>
						<TransitionChild
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-neutral-900/80" />
						</TransitionChild>

						<div className="fixed inset-0 flex">
							<TransitionChild
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full rtl:translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full rtl:translate-x-full"
							>
								<DialogPanel className="relative me-16 flex w-full max-w-xs flex-1">
									<TransitionChild
										as={Fragment}
										enter="ease-in-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-300"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
											<button
												type="button"
												className="-m-2.5 p-2.5"
												onClick={() => setSidebarOpen(false)}
											>
												<span className="sr-only">Close sidebar</span>
												<XMarkIcon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</button>
										</div>
									</TransitionChild>
									{/* Sidebar component, swap this element with another sidebar if you like */}
									{/* <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"></div> */}
									{renderStaticSidebarForDesktop()}
								</DialogPanel>
							</TransitionChild>
						</div>
					</Dialog>
				</Transition>

				{/* Static sidebar for desktop */}
				<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					{renderStaticSidebarForDesktop()}
				</div>

				<div className="lg:ps-72">
					<div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
						<div className="flex h-16 items-center gap-x-4 border-b border-neutral-200 bg-white px-4 shadow-sm sm:h-20 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none dark:border-neutral-600 dark:bg-neutral-800">
							<button
								type="button"
								className="-m-2.5 p-2.5 text-neutral-700 lg:hidden dark:text-neutral-300"
								onClick={() => setSidebarOpen(true)}
							>
								<span className="sr-only">Open sidebar</span>
								<Bars3Icon
									className="h-[1.65rem] w-[1.65rem]"
									aria-hidden="true"
								/>
							</button>

							{/* Separator */}
							<div
								className="h-6 w-px bg-neutral-200 lg:hidden dark:bg-neutral-600"
								aria-hidden="true"
							/>

							<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
								{renderSearchForm()}

								<div className="flex flex-1 items-center justify-center lg:hidden">
									<Logo />
								</div>

								<div className="flex items-center gap-x-4 lg:gap-x-6">
									{/* Separator */}
									<div
										className="hidden lg:block lg:h-6 lg:w-px lg:bg-neutral-200 dark:bg-neutral-500"
										aria-hidden="true"
									/>

									{/* Profile dropdown */}
									<div className="flex flex-1 items-center justify-end">
										<CreateBtn />
										<SwitchDarkMode className="hidden lg:flex" />
										<SearchIconBtn className="flex lg:hidden" />
										<AvatarDropdown />
									</div>
								</div>
							</div>
						</div>
					</div>

					<main className="py-10">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							{/* Replace with your content */}
							{children}
						</div>
					</main>
				</div>
			</div>
		</>
	)
}
