'use client'
import { Fragment, useEffect, useState } from 'react'
import {
	ShoppingBagIcon as ShoppingCartIcon,
	Cog8ToothIcon as CogIcon,
} from '@heroicons/react/24/outline'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import SwitchDarkMode2 from '@/components/SwitchDarkMode/SwitchDarkMode2'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { IS_CHISNGHIAX_DEMO_SITE } from '@/contains/site-settings'
import { useGlobalStateHeaderStyle } from './SiteHeader'

const ControlSettingsDemo = () => {
	// FOR OUR DEMO PAGE, use do not use this, you can delete it.
	const [themeDir, setThemeDIr] = useState<'rtl' | 'ltr'>(
		process.env.NEXT_PUBLIC_SITE_DIRECTION as 'rtl' | 'ltr',
	)

	const [headerStyle, setHeaderStyle] = useGlobalStateHeaderStyle('headerStyle')

	const router = useRouter()

	useEffect(() => {
		if (themeDir === 'rtl') {
			document.querySelector('html')?.setAttribute('dir', 'rtl')
		} else {
			document.querySelector('html')?.removeAttribute('dir')
		}
		return () => {
			document.querySelector('html')?.removeAttribute('dir')
		}
	}, [themeDir])

	if (
		process.env.NEXT_PUBLIC_SITE_GEAR_ICON !== 'true' &&
		!IS_CHISNGHIAX_DEMO_SITE
	) {
		return null
	}

	const renderHeaderStyle = () => {
		return (
			<div>
				<span className="text-sm font-medium">Header styles</span>
				<div className="mt-1.5 flex items-center space-x-2 rtl:space-x-reverse">
					{['style1', 'style2', 'style3'].map(style => {
						return (
							<div
								key={style}
								className={`flex cursor-pointer select-none items-center rounded-full px-3.5 py-1.5 text-xs font-medium uppercase ${
									headerStyle === style
										? 'bg-black text-white shadow-lg shadow-black/10 dark:bg-neutral-200 dark:text-black'
										: 'border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500'
								}`}
								onClick={() => setHeaderStyle(style)}
							>
								{style}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
	const renderRadioThemeDir = () => {
		return (
			<div>
				<span className="text-sm font-medium">Theme dir</span>
				<div className="mt-1.5 flex items-center space-x-2 rtl:space-x-reverse">
					{(['rtl', 'ltr'] as ('rtl' | 'ltr')[]).map(dir => {
						return (
							<div
								key={dir}
								className={`flex cursor-pointer select-none items-center rounded-full px-3.5 py-1.5 text-xs font-medium uppercase ${
									themeDir === dir
										? 'bg-black text-white shadow-lg shadow-black/10 dark:bg-neutral-200 dark:text-black'
										: 'border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500'
								}`}
								onClick={() => setThemeDIr(dir)}
							>
								{dir}
							</div>
						)
					})}
				</div>
			</div>
		)
	}

	const renderRadioHomePages = () => {
		return (
			<div>
				<span className="text-sm font-medium">Home demos</span>
				<div className="mt-1.5 flex flex-wrap gap-1.5">
					{[
						{ name: 'Home 1', uri: '/' },
						{ name: 'Home 2', uri: '/home-2' },
						{ name: 'Home 3', uri: '/home-3-podcast' },
						{ name: 'Home 4', uri: '/home-4-video' },
						{ name: 'Home 5', uri: '/home-5-gallery' },
						{ name: 'Home 6', uri: '/home-6' },
					].map(page => {
						const isPage = router.asPath === page.uri
						return (
							<Link
								href={page.uri}
								key={page.uri}
								className={`flex cursor-pointer select-none items-center rounded-full px-3.5 py-1.5 text-xs font-medium capitalize ${
									isPage
										? 'bg-black text-white shadow-lg shadow-black/10 dark:bg-neutral-200 dark:text-black'
										: 'border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500'
								}`}
							>
								{page.name}
							</Link>
						)
					})}
				</div>
			</div>
		)
	}

	const renderControlSelections = () => {
		return (
			<div className="ControlSelections relative z-50 hidden md:block">
				<div className="fixed end-3 top-1/4 z-50 flex items-center">
					<Popover className="relative">
						{({ open }) => (
							<>
								<PopoverButton
									className={`z-10 rounded-xl border border-neutral-200 bg-white p-2.5 shadow-xl hover:bg-neutral-100 focus:outline-none dark:border-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 ${
										open ? 'ring-primary-500 focus:ring-2' : ''
									}`}
								>
									<CogIcon className="h-8 w-8" />
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
									<PopoverPanel className="absolute end-0 z-10 mt-3 w-screen max-w-sm">
										<div className="nc-custom-shadow-1 overflow-hidden rounded-2xl bg-white dark:bg-neutral-950">
											<div className="relative space-y-3.5 p-6 xl:space-y-5">
												<span className="text-xl font-semibold">Customize</span>
												<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
												{renderRadioThemeDir()}
												<div className="flex space-x-2 xl:space-x-4 rtl:space-x-reverse">
													<span className="text-sm font-medium">Dark mode</span>
													<SwitchDarkMode2 />
												</div>

												{renderRadioHomePages()}
												{renderHeaderStyle()}
											</div>
											<div className="bg-gray-50 p-5 dark:bg-white/5">
												<a
													className="flex w-full items-center justify-center !rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
													href={
														'https://themeforest.net/item/ncmaz-nextjs-headless-wordpress-blog-magazine/47815656'
													}
													target="_blank"
													rel="noopener noreferrer"
												>
													<ShoppingCartIcon className="h-4 w-4" />
													<span className="ms-2">Buy this template</span>
												</a>
											</div>
										</div>
									</PopoverPanel>
								</Transition>
							</>
						)}
					</Popover>
				</div>
			</div>
		)
	}

	return <>{renderControlSelections()}</>
}

export default ControlSettingsDemo
