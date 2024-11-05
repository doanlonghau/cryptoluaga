import { FC, useEffect, useState } from 'react'
import { CardCategory1Props } from '@/components/CardCategory1/CardCategory1'
import NcModal from '@/components/NcModal/NcModal'
import Button from '@/components/Button/Button'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useLazyQuery } from '@apollo/client'
import ButtonPrimary from './Button/ButtonPrimary'
import Empty from './Empty'
import CardCategory1Skeleton from '@/components/CardCategory1/CardCategory1Skeleton'
import { QUERY_GET_CATEGORIES } from '@/fragments/queries'
import { NcmazFcCategoryFullFieldsFragmentFragment } from '@/__generated__/graphql'
import errorHandling from '@/utils/errorHandling'
import GraphqlError from './GraphqlError'
import getTrans from '@/utils/getTrans'
import { getCatgoryDataFromCategoryFragment } from '@/utils/getCatgoryDataFromCategoryFragment'
import NcImage from './NcImage/NcImage'
import ButtonThird from './Button/ButtonThird'
import { CategoryIcon } from './Icons/Icons'

const T = getTrans()

interface Props {
	onUpdated: (ids: number[]) => void
	initIds?: number[]
}

const ModalSelectCategories: FC<Props> = ({ onUpdated, initIds = [] }) => {
	const [idSlecteds, setIdSlecteds] = useState<number[]>(initIds)
	const [refetchTimes, setRefetchTimes] = useState(0)

	useEffect(() => {
		setIdSlecteds(initIds)
	}, [initIds])

	const [queryGetCategories, { loading, error, data, fetchMore, refetch }] =
		useLazyQuery(QUERY_GET_CATEGORIES, {
			variables: { first: 100 },
			notifyOnNetworkStatusChange: true,
			context: {
				fetchOptions: {
					method: process.env.NEXT_PUBLIC_SITE_API_METHOD || 'GET',
				},
			},
			onError: (error) => {
				if (refetchTimes > 3) {
					errorHandling(error)
					return
				}
				setRefetchTimes(refetchTimes + 1)

				refetch()
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

	const cats = (data?.categories?.nodes ||
		[]) as NcmazFcCategoryFullFieldsFragmentFragment[]

	const renderModalContent = () => {
		if (!!error) {
			return (
				<div>
					<GraphqlError
						error={error}
						hasRefetchBtn
						refetch={refetch}
						loading={loading}
					/>
				</div>
			)
		}

		return (
			<div>
				{/* LOOP ITEMS */}
				{!cats.length && !loading ? (
					<Empty />
				) : (
					<div className="grid gap-2.5 sm:grid-cols-2 sm:gap-5 sm:py-2 md:grid-cols-3 xl:md:grid-cols-4">
						{!cats.length && loading
							? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
									<CardCategory1Skeleton key={i} />
								))
							: (cats || []).map((cat) => {
									const isSelected = idSlecteds.includes(cat.databaseId)
									return (
										<div
											key={cat.databaseId}
											className="cursor-pointer"
											aria-hidden
											onClick={() => {
												if (isSelected) {
													setIdSlecteds(
														idSlecteds.filter((id) => id !== cat.databaseId),
													)
												} else {
													setIdSlecteds([...idSlecteds, cat.databaseId])
												}
											}}
										>
											<CardCategory
												key={cat.databaseId}
												term={cat}
												size="normal"
												className={`border transition-colors dark:border-neutral-700 ${isSelected ? 'bg-neutral-50/50 ring-2 ring-neutral-700 dark:bg-neutral-800 dark:ring-neutral-400' : 'border-neutral-200/70 ring-neutral-200/70 hover:ring-2 dark:hover:ring-neutral-700'}`}
											/>
										</div>
									)
								})}
					</div>
				)}

				{/* SHOW MORE */}
				{data?.categories?.pageInfo.hasNextPage ? (
					<div className="mt-7 flex justify-center">
						<ButtonPrimary loading={loading} onClick={handleClickShowMore}>
							{T['Show me more']}
						</ButtonPrimary>
					</div>
				) : null}
			</div>
		)
	}

	return (
		<div className="nc-ModalSelectCategories">
			<NcModal
				renderTrigger={(openModal) => (
					<Button
						pattern="third"
						fontSize="text-sm font-medium"
						className={
							initIds.length
								? 'ring-2 ring-neutral-800 hover:ring-neutral-800'
								: undefined
						}
						onClick={() => {
							openModal()
							queryGetCategories()
						}}
					>
						{!!initIds.length && (
							<div className="pointer-events-none absolute -right-1 -top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-800 p-0.5 text-center text-[0.55rem] leading-none text-white ring ring-white ring-offset-0 dark:bg-neutral-200 dark:text-black dark:ring-white">
								{initIds.length}
							</div>
						)}
						<CategoryIcon className="-ms-1.5 me-2 h-5 w-5" />
						<div>
							<span>{T.Categories}</span>
						</div>
						<ChevronDownIcon
							className="-me-1 ms-2 h-4 w-4"
							aria-hidden="true"
						/>
					</Button>
				)}
				onOpenModal={() => setIdSlecteds(initIds)}
				contentExtraClass="max-w-screen-lg"
				modalTitle={T['Categories']}
				renderContent={renderModalContent}
				enableFooter={true}
				renderFooter={(closeModal) => {
					return (
						<div className="flex items-center justify-between">
							<Button
								pattern="link"
								onClick={() => setIdSlecteds([])}
								// sizeClass="py-3 px-4 sm:py-3 sm:px-6"
							>
								{T['Clear']}
							</Button>
							<ButtonPrimary
								onClick={() => {
									onUpdated(idSlecteds)
									closeModal()
								}}
								// sizeClass="py-3 px-4 sm:py-3 sm:px-6"
							>
								{T['Apply']}
							</ButtonPrimary>
						</div>
					)
				}}
			/>
		</div>
	)
}

const CardCategory: FC<CardCategory1Props> = ({
	className = '',
	size = 'normal',
	term,
}) => {
	const { count, name, featuredImageMeta, databaseId } =
		getCatgoryDataFromCategoryFragment(term)

	return (
		<div
			className={`nc-CardCategory1 flex items-center rounded-2xl p-2.5 pr-3 ${className}`}
		>
			<NcImage
				alt={name}
				containerClassName={`relative flex-shrink-0 ${
					size === 'large' ? 'w-20 h-20' : 'w-12 h-12'
				} rounded-xl me-4 overflow-hidden`}
				src={featuredImageMeta?.sourceUrl || ''}
				fill
				className="object-cover"
				sizes="80px"
			/>
			<div>
				<h2
					className={`${
						size === 'large' ? 'text-lg' : 'text-base'
					} text-sm font-medium text-neutral-900 sm:text-base sm:font-semibold dark:text-neutral-100`}
				>
					{name}
				</h2>
				<span
					className={`${
						size === 'large' ? 'text-sm' : 'text-xs'
					} mt-[2px] block text-neutral-500 dark:text-neutral-400`}
				>
					{count} {T['Articles']}
				</span>
			</div>
		</div>
	)
}

export default ModalSelectCategories
