import { FC, useState } from 'react'
import CardCategory1 from '@/components/CardCategory1/CardCategory1'
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
import { CategoryIcon } from './Icons/Icons'

export interface ModalCategoriesProps {}

const ModalCategories: FC<ModalCategoriesProps> = () => {
	const [refetchTimes, setRefetchTimes] = useState(0)

	const T = getTrans()

	const [queryGetCategories, { loading, error, data, fetchMore, refetch }] =
		useLazyQuery(QUERY_GET_CATEGORIES, {
			variables: { first: 20 },
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
							: (cats || []).map((cat) => (
									<CardCategory1
										key={cat.databaseId}
										term={cat}
										size="normal"
										className="rounded-2xl border border-neutral-100 p-2.5 pr-3 dark:border-neutral-700"
									/>
								))}
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
		<div className="nc-ModalCategories">
			<NcModal
				renderTrigger={(openModal) => (
					<Button
						pattern="third"
						fontSize="text-sm font-medium"
						onClick={() => {
							openModal()
							queryGetCategories()
						}}
					>
						<CategoryIcon className="-ms-1.5 me-2 h-5 w-5" />

						<div>
							<span className="hidden sm:inline">{T['Other categories']}</span>
							<span className="inline sm:hidden">{T.Categories}</span>
						</div>
						<ChevronDownIcon
							className="-me-1 ms-2 h-4 w-4"
							aria-hidden="true"
						/>
					</Button>
				)}
				modalTitle={T['Discover other categories']}
				renderContent={renderModalContent}
				enableFooter={false}
			/>
		</div>
	)
}

export default ModalCategories
