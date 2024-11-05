'use client'

import {
	Popover,
	Transition,
	PopoverButton,
	PopoverPanel,
} from '@headlessui/react'
import { FC, Fragment, useEffect } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import SwitchDarkMode2 from '@/components/SwitchDarkMode/SwitchDarkMode2'
import Link from 'next/link'
import {
	BookmarkIcon,
	FingerPrintIcon,
	FireIcon,
	HeartIcon,
	LightBulbIcon,
	PlusCircleIcon,
	PowerIcon,
	UserIcon as TwUserIcon,
	UserPlusIcon,
} from '@heroicons/react/24/outline'
import { useLogout } from '@faustwp/core'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores/store'
import { useLoginModal } from '@/hooks/useLoginModal'
import { getImageDataFromImageFragment } from '@/utils/getImageDataFromImageFragment'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import CircleLoading from '../Loading/CircleLoading'
import { useRouter } from 'next/router'
import getTrans from '@/utils/getTrans'
import { UserIcon } from '../Icons/Icons'
import toast from 'react-hot-toast'

interface Props {
	className?: string
}
export default function AvatarDropdown({ className = '' }: Props) {
	const { isReady, isAuthenticated } = useSelector(
		(state: RootState) => state.viewer.authorizedUser,
	)
	const { logout } = useLogout()
	const { viewer } = useSelector((state: RootState) => state.viewer)
	const { openLoginModal } = useLoginModal()
	const router = useRouter()
	const T = getTrans()

	useEffect(() => {
		// mot so truong hop ngoai le, can phai reload lai trang
		if (isAuthenticated === false && !!viewer?.databaseId) {
			router.reload()
		}
	}, [isAuthenticated, viewer?.databaseId])

	const renderAvatar = () => {
		if (!viewer?.databaseId) {
			return null
		}
		return (
			<Link href={viewer.uri || ''} className="flex items-center">
				<Avatar
					imgUrl={
						getImageDataFromImageFragment(
							viewer?.ncUserMeta?.featuredImage?.node,
						).sourceUrl || ''
					}
					userName={viewer?.name || ''}
					sizeClass="w-12 h-12"
				/>

				<div className="ms-3 flex-grow overflow-hidden">
					<h4 className="font-semibold capitalize">{viewer?.name}</h4>
					<p className="mt-0.5 truncate text-xs">
						<span className="truncate">{viewer?.email}</span>
					</p>
				</div>
			</Link>
		)
	}

	const renderCreatePost = () => {
		return (
			<Link
				href={'/submission'}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
				onClick={(e) => {
					if (isAuthenticated === false) {
						e.preventDefault()
						openLoginModal('/submission')
					}
				}}
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<PlusCircleIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T['Create']}</p>
				</div>
			</Link>
		)
	}

	const renderMenuEditProfile = () => {
		return (
			<Link
				href={'/dashboard/edit-profile/profile'}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<TwUserIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T['Edit profile']}</p>
				</div>
			</Link>
		)
	}

	const renderMenuMyPosts = () => {
		return (
			<Link
				href={'/dashboard/posts/published'}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none">
						<path
							d="M8 12.2H15"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M8 16.2H12.38"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T['My Posts']}</p>
				</div>
			</Link>
		)
	}

	const renderMenuWishlist = () => {
		return (
			<Link
				href={`/author/${viewer?.slug}/favorites`}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<HeartIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T.Wishlist}</p>
				</div>
			</Link>
		)
	}

	const renderMenuBookmark = () => {
		return (
			<Link
				href={'/readinglist'}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<BookmarkIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<span className="text-sm font-medium">{T['Reading list']}</span>
				</div>
			</Link>
		)
	}

	const renderSwitchDarkMode = () => {
		return (
			<div className="-m-3 flex items-center justify-between rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700">
				<div className="flex items-center">
					<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
						<LightBulbIcon className="h-6 w-6" />
					</div>
					<div className="ms-4">
						<p className="text-sm font-medium">{T['Dark theme']}</p>
					</div>
				</div>
				<SwitchDarkMode2 />
			</div>
		)
	}

	const renderMenuHelp = () => {
		if (!NC_SITE_SETTINGS?.help_page?.uri) {
			return null
		}

		return (
			<Link
				href={NC_SITE_SETTINGS.help_page.uri}
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<FireIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T.Helps}</p>
				</div>
			</Link>
		)
	}

	const renderMenuSignUp = () => {
		return (
			<Link
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
				href={'/sign-up'}
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<UserPlusIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<span className="text-sm font-medium">{T['Sign up']}</span>
				</div>
			</Link>
		)
	}
	const renderMenuLogIn = () => {
		return (
			<button
				type="button"
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
				onClick={() => openLoginModal()}
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<FingerPrintIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T.Login}</p>
				</div>
			</button>
		)
	}

	const renderMenuLogOut = () => {
		return (
			<button
				className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
				onClick={() => logout('/')}
			>
				<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
					<PowerIcon className="h-6 w-6" />
				</div>
				<div className="ms-4">
					<p className="text-sm font-medium">{T['Log out']}</p>
				</div>
			</button>
		)
	}

	return (
		<div className={`AvatarDropdown ${className}`}>
			<Popover className="relative" as="div">
				{({ open, close }) => (
					<>
						<PopoverButton
							as="button"
							className={`flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none sm:h-12 sm:w-12 dark:text-neutral-300 dark:hover:bg-neutral-800`}
						>
							{!viewer?.name ? (
								<UserIcon />
							) : (
								<Avatar
									imgUrl={
										getImageDataFromImageFragment(
											viewer?.ncUserMeta?.featuredImage?.node,
										).sourceUrl || ''
									}
									userName={viewer?.name || ''}
									sizeClass="w-7 h-7 sm:w-8 sm:h-8 text-sm"
									radius="rounded-full"
									containerClassName="ring-1 ring-neutral-100 dark:ring-neutral-800 shadow-inner"
								/>
							)}
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute -end-2 z-10 mt-3.5 w-screen max-w-[260px] px-4 sm:end-0 sm:px-0">
								<div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid grid-cols-1 gap-6 bg-white px-6 py-7 dark:bg-neutral-800">
										{(!isReady || (isAuthenticated && !viewer?.databaseId)) && (
											<div className="my-1 opacity-70">
												<CircleLoading
													childClassName="w-6 h-6"
													className="text-neutral-500 dark:text-neutral-400"
												/>
											</div>
										)}

										{isAuthenticated && renderAvatar()}

										{isAuthenticated && (
											<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
										)}

										{/* ------------------ 0 --------------------- */}
										{isReady && !isAuthenticated && renderMenuSignUp()}
										{isReady && !isAuthenticated && renderMenuLogIn()}

										{/* ------------------ 1 --------------------- */}
										{isReady &&
											NC_SITE_SETTINGS['submissions-settings']?.enable &&
											renderCreatePost()}

										{/* ------------------ 1 --------------------- */}
										{isAuthenticated && renderMenuEditProfile()}

										{/* ------------------ 2 --------------------- */}
										{isAuthenticated && renderMenuMyPosts()}

										{/* ------------------ 3 --------------------- */}
										{isAuthenticated && renderMenuWishlist()}

										{/* ------------------ 4 --------------------- */}
										{renderMenuBookmark()}

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

										{/* ------------------ 5 --------------------- */}
										{renderSwitchDarkMode()}

										{/* ------------------ 6 --------------------- */}
										{renderMenuHelp()}

										{/* ------------------ 7 --------------------- */}
										{isAuthenticated && renderMenuLogOut()}
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	)
}
