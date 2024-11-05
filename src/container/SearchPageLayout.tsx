'use client'
import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'
import Input from '@/components/Input/Input'
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2'
import SectionTrendingTopic from '@/components/SectionTrendingTopic'
import { FILTERS_OPTIONS } from '@/contains/contants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import Tab from './SearchPageTab'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import getTrans from '@/utils/getTrans'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'

interface Props {
	children: React.ReactNode
	handleChangeFilterPosts?: (filter: (typeof FILTERS_OPTIONS)[number]) => void
	top10Categories: TCategoryCardFull[] | null
}

const SearchPageLayout: FC<Props> = ({
	children,
	handleChangeFilterPosts,
	top10Categories,
}) => {
	const router = useRouter()
	const search = router.query.search?.[0] || ''

	const T = getTrans()

	const getCurrentTab = () => {
		let currentTab: 'posts' | 'categories' | 'authors' = 'posts'
		if (/\/search\/posts/g.test(router.pathname)) {
			return (currentTab = 'posts')
		}
		if (/\/search\/categories/g.test(router.pathname)) {
			return (currentTab = 'categories')
		}
		if (/\/search\/authors/g.test(router.pathname)) {
			return (currentTab = 'authors')
		}
		return currentTab
	}

	return (
		<div className="">
			{/* HEADER */}
			<div
				className={`right-0 start-0 top-0 h-24 w-full bg-primary-100/50 2xl:h-28 dark:bg-neutral-900`}
			/>
			<div className="container">
				<header className="mx-auto -mt-10 flex max-w-2xl flex-col lg:-mt-7">
					<form
						className="relative"
						action="#"
						onSubmit={e => {
							e.preventDefault()
							const inputNode = document.getElementById(
								'search-input',
							) as HTMLInputElement
							const tab = getCurrentTab()
							const newSearch = inputNode.value
							router.push(`/search/${tab}/${newSearch}`)
						}}
					>
						<label
							htmlFor="search-input"
							className="text-neutral-700 dark:text-neutral-200"
						>
							<span className="sr-only">Search all icons</span>
							<Input
								id="search-input"
								type="search"
								placeholder={T.pageSearch['Type and press enter']}
								className="border-opacity-0 text-base shadow-md dark:!bg-neutral-800"
								sizeClass="h-16 ps-14 py-4 pe-3 sm:pe-5 md:ps-16"
								fontClass="text-base text-neutral-800 dark:text-neutral-200"
								rounded="rounded-full"
								defaultValue={search || ''}
							/>
							<span className="absolute start-5 top-1/2 -translate-y-1/2 transform text-2xl md:start-6">
								<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1.5"
										d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
									></path>
								</svg>
							</span>
						</label>
					</form>
					{NC_SITE_SETTINGS.search_page?.recommended_searches?.enable ===
						true && (
						<div className="mt-5 flex flex-wrap justify-center gap-2 text-center text-sm text-neutral-700 dark:text-neutral-200">
							<p>
								{NC_SITE_SETTINGS.search_page?.recommended_searches?.title}:{' '}
							</p>
							{NC_SITE_SETTINGS.search_page?.recommended_searches?.items?.map(
								item => (
									<Link
										className="underline-offset-2 hover:underline"
										href={item?.url || '#'}
										key={item?.title}
									>
										{item?.title}
									</Link>
								),
							)}
						</div>
					)}
				</header>
			</div>
			{/* ====================== END HEADER ====================== */}

			<div className="container space-y-16 py-16 lg:space-y-28 lg:pb-28 lg:pt-20">
				<main>
					{/* TABS FILTER */}
					<div className="flex flex-col border-neutral-200 sm:flex-row sm:items-center sm:justify-between sm:border-b dark:border-neutral-600">
						<Tab search={search} currentTab={getCurrentTab()} />

						<div className="mb-4 block w-full border-b border-neutral-300 sm:hidden dark:border-neutral-500"></div>
						{getCurrentTab() === 'posts' ? (
							<div className="flex justify-end">
								<ArchiveFilterListBox
									lists={FILTERS_OPTIONS}
									onChange={handleChangeFilterPosts}
								/>
							</div>
						) : null}
					</div>

					{children}
				</main>

				{/* === SECTION 5 === */}
				{NC_SITE_SETTINGS.search_page?.show_top_categories && (
					<SectionTrendingTopic categories={top10Categories || []} />
				)}

				{/* SUBCRIBES */}
				{NC_SITE_SETTINGS.search_page?.show_newsletter_section && (
					<SectionSubscribe2 />
				)}
			</div>
		</div>
	)
}

export default SearchPageLayout
