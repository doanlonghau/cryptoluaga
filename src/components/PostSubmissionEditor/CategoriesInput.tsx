import { useLazyQuery } from '@apollo/client'
import { FC, Fragment, useEffect, useRef, useState } from 'react'
import Loading from '../Button/Loading'
import { QUERY_GET_CATEGORIES } from '@/fragments/queries'
import { NcmazFcCategoryFullFieldsFragmentFragment } from '@/__generated__/graphql'
import ButtonPrimary from '../Button/ButtonPrimary'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import getTrans from '@/utils/getTrans'

const MAX_TAGS_LENGTH =
	NC_SITE_SETTINGS['submissions-settings']?.max_categories_allowed || 5

interface Props {
	onChange: (categories: NcmazFcCategoryFullFieldsFragmentFragment[]) => void
	defaultValue?: NcmazFcCategoryFullFieldsFragmentFragment[]
}

const CategoriesInput: FC<Props> = ({ onChange, defaultValue }) => {
	const T = getTrans()

	const [queryGetCategories, { loading, error, data, fetchMore, called }] =
		useLazyQuery(QUERY_GET_CATEGORIES, {
			notifyOnNetworkStatusChange: true,
			context: {
				fetchOptions: {
					method: process.env.NEXT_PUBLIC_SITE_API_METHOD || 'GET',
				},
			},
			variables: {
				first: 50,
			},
		})

	const handleClickShowMore = () => {
		fetchMore({
			variables: {
				after: data?.categories?.pageInfo?.endCursor,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult || !fetchMoreResult?.categories?.nodes) {
					return prev
				}

				return {
					categories: {
						...fetchMoreResult.categories,
						nodes: [
							...(prev?.categories?.nodes || []),
							...fetchMoreResult.categories.nodes,
						],
					},
				}
			},
		})
	}

	//
	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLButtonElement>(null)
	//

	let [isOpen, setIsOpen] = useState(false)
	const [categories, setCategories] = useState<
		NcmazFcCategoryFullFieldsFragmentFragment[]
	>(defaultValue || [])

	useEffect(() => {
		if (!isOpen) return
		queryGetCategories()
	}, [isOpen])

	useEffect(() => {
		onChange(categories)
	}, [categories.length])

	const checkIncludes = (
		category: NcmazFcCategoryFullFieldsFragmentFragment,
	) => {
		return categories.some((item) => item.databaseId === category.databaseId)
	}

	function closePopover() {
		setIsOpen(false)
	}

	function openPopover() {
		setIsOpen(true)
	}

	const setNewTags = (category: NcmazFcCategoryFullFieldsFragmentFragment) => {
		if (!checkIncludes(category)) {
			setCategories((prevCategories) => [...prevCategories, category])
		}

		if (inputRef.current) {
			inputRef.current.value = ''
			inputRef.current.focus()
		}
	}

	const handleRemoveTag = (
		category: NcmazFcCategoryFullFieldsFragmentFragment,
	) => {
		setCategories(
			categories.filter((t) => t.databaseId !== category.databaseId),
		)
		setTimeout(() => {
			inputRef.current?.focus()
		}, 100)
	}

	useEffect(() => {
		if (eventClickOutsideDiv) {
			document.removeEventListener('click', eventClickOutsideDiv)
		}
		isOpen && document.addEventListener('click', eventClickOutsideDiv)
		return () => {
			document.removeEventListener('click', eventClickOutsideDiv)
		}
	}, [isOpen])

	const eventClickOutsideDiv = (event: MouseEvent) => {
		if (!isOpen || !containerRef.current) {
			return
		}

		// CLICK IN_SIDE
		if (
			containerRef.current.contains(event.target as Node) ||
			inputRef.current?.contains(event.target as Node)
		) {
			return
		}

		// CLICK OUT_SIDE
		setIsOpen(false)
	}

	const categoriesData = (data?.categories?.nodes ||
		[]) as NcmazFcCategoryFullFieldsFragmentFragment[]
	const isMax = categories.length >= MAX_TAGS_LENGTH

	return (
		<div className="relative w-full text-xs sm:text-sm">
			<>
				<ul className="flex flex-wrap gap-1.5">
					{categories.map((cat) => (
						<li
							className="flex items-center justify-center rounded-lg bg-neutral-100 px-3 py-2 dark:bg-neutral-800"
							key={cat.databaseId}
						>
							{cat.name}
							<button
								className="ms-1 flex items-center justify-center px-1 text-base hover:text-neutral-900 dark:hover:text-neutral-50"
								onClick={() => handleRemoveTag(cat)}
								title={T.pageSubmission['Remove category']}
							>
								<XMarkIcon className="h-4 w-4" />
							</button>
						</li>
					))}

					<li>
						<button
							ref={inputRef}
							onClick={openPopover}
							className={`${
								categories.length ? 'px-3' : ''
							} h-full border-none bg-transparent py-2 text-base text-neutral-600 hover:text-neutral-900 focus:outline-none focus:ring-0 disabled:cursor-not-allowed dark:text-neutral-400 dark:hover:text-neutral-300`}
							type="button"
							disabled={isMax}
						>
							{`${T.pageSubmission['Add categories']} (${categories.length}/${MAX_TAGS_LENGTH})`}
						</button>
					</li>
				</ul>
				<Transition as={Fragment} show={!isMax && isOpen}>
					<div
						ref={containerRef}
						className="absolute inset-x-0 top-full z-50 mt-4 space-y-5 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/[0.03] dark:bg-neutral-800"
					>
						<h3 className="text-xl font-semibold">
							{T.pageSubmission.Categories}
						</h3>
						<div className="w-full border-b border-neutral-300 dark:border-neutral-700" />
						{!!error && <p className="text-red-500">{error.message}</p>}
						{!!loading && !categoriesData.length && <Loading />}
						{!!categoriesData.length ? (
							<ul className="flex flex-wrap gap-2">
								{categoriesData.map((cat) => {
									const isSelected = checkIncludes(cat)
									return (
										<li key={cat.databaseId}>
											<button
												className={`flex items-center justify-center rounded-lg px-3 py-2 ${
													isSelected
														? 'bg-neutral-900 text-neutral-50'
														: 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600'
												}`}
												onClick={() => {
													if (isSelected) {
														handleRemoveTag(cat)
														return
													}
													!isMax && setNewTags(cat)
												}}
											>
												{cat.name} ({cat.count || 0})
											</button>
										</li>
									)
								})}
							</ul>
						) : null}

						{/* SHOW MORE */}
						{data?.categories?.pageInfo.hasNextPage ? (
							<>
								<div className="w-full border-b border-neutral-300 dark:border-neutral-700" />
								<div className="flex justify-center">
									<ButtonPrimary
										loading={loading}
										onClick={handleClickShowMore}
										fontSize="text-sm font-medium"
									>
										{T.pageSubmission['Load more categories']}
									</ButtonPrimary>
								</div>
							</>
						) : null}
					</div>
				</Transition>
			</>
		</div>
	)
}

export default CategoriesInput
