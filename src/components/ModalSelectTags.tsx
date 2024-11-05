'use client'

import { FC, useEffect, useState } from 'react'
import NcModal from '@/components/NcModal/NcModal'
import Button from '@/components/Button/Button'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { FragmentType } from '@/__generated__'
import { useLazyQuery } from '@apollo/client'
import ButtonPrimary from './Button/ButtonPrimary'
import Empty from './Empty'
import Skeleton from './Skeleton/Skeleton'
import { QUERY_GET_TAGS } from '@/fragments/queries'
import { getTagDataFromTagFragment } from '@/utils/getTagDataFromTagFragment'
import { NC_TAG_SHORT_FIELDS_FRAGMENT } from '@/fragments'
import errorHandling from '@/utils/errorHandling'
import GraphqlError from './GraphqlError'
import getTrans from '@/utils/getTrans'
import ButtonThird from './Button/ButtonThird'
import { TagIcon } from './Icons/Icons'
const T = getTrans()

interface Props {
	onUpdated: (ids: number[]) => void
	initIds?: number[]
}

const ModalSelectTags: FC<Props> = ({ onUpdated, initIds = [] }) => {
	const [idSlecteds, setIdSlecteds] = useState<number[]>(initIds)
	const [refetchTimes, setRefetchTimes] = useState(0)

	useEffect(() => {
		setIdSlecteds(initIds)
	}, [initIds])

	const [queryGetTags, { loading, error, data, fetchMore, refetch }] =
		useLazyQuery(QUERY_GET_TAGS, {
			notifyOnNetworkStatusChange: true,
			variables: { first: 100 },
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

	const tags = (data?.tags?.nodes || []) as FragmentType<
		typeof NC_TAG_SHORT_FIELDS_FRAGMENT
	>[]

	const handleClickShowMore = () => {
		fetchMore({
			variables: {
				after: data?.tags?.pageInfo?.endCursor,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult || !fetchMoreResult?.tags?.nodes) {
					return prev
				}

				return {
					tags: {
						...fetchMoreResult.tags,
						nodes: [
							...(prev?.tags?.nodes || []),
							...fetchMoreResult.tags.nodes,
						],
					},
				}
			},
		})
	}

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
				{!tags?.length && !loading ? (
					<Empty />
				) : (
					<div className="flex flex-wrap gap-2.5 dark:text-neutral-200">
						{!tags?.length && loading
							? [
									100, 90, 80, 100, 100, 75, 160, 100, 77, 144, 88, 100, 55, 88,
									77, 100, 66, 99, 77, 76, 88,
								].map((w, i) => (
									<div
										key={i}
										className={`inline-flex gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-600 md:px-4 md:py-2.5 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300`}
									>
										<Skeleton width={w} />
									</div>
								))
							: (tags || []).map((item) => {
									const tag = getTagDataFromTagFragment(item)
									const isSelected = idSlecteds.includes(tag.databaseId)
									return (
										<div
											key={getTagDataFromTagFragment(tag).databaseId}
											className={`inline-block cursor-pointer rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-600 md:px-4 md:py-2.5 dark:border-neutral-700 dark:text-neutral-300 ${isSelected ? 'ring-2 ring-neutral-700 dark:ring-neutral-400' : 'border-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
											aria-hidden
											onClick={() => {
												if (isSelected) {
													setIdSlecteds(
														idSlecteds.filter((id) => id !== tag.databaseId),
													)
												} else {
													setIdSlecteds([...idSlecteds, tag.databaseId])
												}
											}}
										>
											#{getTagDataFromTagFragment(tag).name}
											<span className="text-sm font-normal">
												({getTagDataFromTagFragment(tag).count})
											</span>
										</div>
									)
								})}
					</div>
				)}

				{/* SHOW MORE */}
				{data?.tags?.pageInfo.hasNextPage ? (
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
		<div className="nc-ModalTags">
			<NcModal
				contentExtraClass="max-w-screen-md"
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
							queryGetTags()
						}}
					>
						{!!initIds.length && (
							<div className="pointer-events-none absolute -right-1 -top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-800 p-0.5 text-center text-[0.55rem] leading-none text-white ring ring-white ring-offset-0 dark:bg-neutral-200 dark:text-black dark:ring-white">
								{initIds.length}
							</div>
						)}
						<TagIcon className="-ms-1.5 me-2 h-5 w-5" />
						<div>
							<span>{T['Tags']}</span>
						</div>
						<ChevronDownIcon
							className="-me-1 ms-2 h-4 w-4"
							aria-hidden="true"
						/>
					</Button>
				)}
				onOpenModal={() => setIdSlecteds(initIds)}
				modalTitle={T['Tags']}
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

export default ModalSelectTags
