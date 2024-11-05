import { FC, useEffect, useState } from 'react'
import NcModal from '@/components/NcModal/NcModal'
import Button from '@/components/Button/Button'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useLazyQuery } from '@apollo/client'
import ButtonPrimary from './Button/ButtonPrimary'
import Empty from './Empty'
import CardCategory1Skeleton from '@/components/CardCategory1/CardCategory1Skeleton'
import { QUERY_GET_USERS } from '@/fragments/queries'
import { NcmazFcUserFullFieldsFragment } from '@/__generated__/graphql'
import errorHandling from '@/utils/errorHandling'
import GraphqlError from './GraphqlError'
import getTrans from '@/utils/getTrans'
import ButtonThird from './Button/ButtonThird'
import { UserSearchIcon } from './Icons/Icons'
import Avatar from './Avatar/Avatar'
import { getImageDataFromImageFragment } from '@/utils/getImageDataFromImageFragment'

const T = getTrans()

interface Props {
	onUpdated: (ids: number[]) => void
	initIds?: number[]
}

const ModalSelectAuthors: FC<Props> = ({ onUpdated, initIds = [] }) => {
	const [idSlecteds, setIdSlecteds] = useState<number[]>(initIds)
	const [refetchTimes, setRefetchTimes] = useState(0)

	useEffect(() => {
		setIdSlecteds(initIds)
	}, [initIds])

	const [queryGetUsers, { loading, error, data, fetchMore, refetch }] =
		useLazyQuery(QUERY_GET_USERS, {
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
				after: data?.users?.pageInfo?.endCursor,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult || !fetchMoreResult?.users?.nodes) {
					return prev
				}

				return {
					users: {
						...fetchMoreResult.users,
						nodes: [
							...(prev?.users?.nodes || []),
							...fetchMoreResult.users.nodes,
						],
					},
				}
			},
		})
	}

	const users = (data?.users?.nodes || []) as NcmazFcUserFullFieldsFragment[]

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
				{!users.length && !loading ? (
					<Empty />
				) : (
					<div className="grid gap-2.5 sm:grid-cols-2 sm:gap-5 sm:py-2 md:grid-cols-3 xl:md:grid-cols-3">
						{!users.length && loading
							? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
									<CardCategory1Skeleton key={i} />
								))
							: (users || []).map((user) => {
									const isSelected = idSlecteds.includes(user.databaseId)
									return (
										<div
											key={user.databaseId}
											className="cursor-pointer"
											aria-hidden
											onClick={() => {
												if (isSelected) {
													setIdSlecteds(
														idSlecteds.filter((id) => id !== user.databaseId),
													)
												} else {
													setIdSlecteds([...idSlecteds, user.databaseId])
												}
											}}
										>
											<CardUser
												key={user.databaseId}
												user={user}
												className={`border transition-colors dark:border-neutral-700 ${isSelected ? 'bg-neutral-50/50 ring-2 ring-neutral-700 dark:bg-neutral-800 dark:ring-neutral-400' : 'border-neutral-200/80 ring-neutral-200/70 hover:ring-2 dark:hover:ring-neutral-700'}`}
											/>
										</div>
									)
								})}
					</div>
				)}

				{/* SHOW MORE */}
				{data?.users?.pageInfo.hasNextPage ? (
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
		<div className="nc-ModalSelectUsers">
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
							queryGetUsers()
						}}
					>
						{!!initIds.length && (
							<div className="pointer-events-none absolute -right-1 -top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-800 p-0.5 text-center text-[0.55rem] leading-none text-white ring ring-white ring-offset-0 dark:bg-neutral-200 dark:text-black dark:ring-white">
								{initIds.length}
							</div>
						)}

						<UserSearchIcon className="-ms-1.5 me-2 h-5 w-5" />
						<div>
							<span>{T.Authors}</span>
						</div>
						<ChevronDownIcon
							className="-me-1 ms-2 h-4 w-4"
							aria-hidden="true"
						/>
					</Button>
				)}
				onOpenModal={() => setIdSlecteds(initIds)}
				contentExtraClass="max-w-4xl"
				modalTitle={T['Authors']}
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

const CardUser: FC<{
	user: NcmazFcUserFullFieldsFragment
	className: string
}> = ({ user, className = '' }) => {
	const { name, ncUserMeta, registeredDate } = user

	return (
		<div className={`flex items-center rounded-2xl px-3 py-4 ${className}`}>
			<Avatar
				sizeClass="h-11 w-11 text-base"
				containerClassName="flex-shrink-0 me-4"
				radius="rounded-full"
				imgUrl={
					getImageDataFromImageFragment(ncUserMeta?.featuredImage?.node)
						.sourceUrl
				}
				userName={name || 'T'}
			/>
			<div>
				<h2 className="text-sm font-medium capitalize text-neutral-900 sm:text-base sm:font-semibold dark:text-neutral-100">
					{name}
				</h2>
				<span className="mt-[2px] block text-xs text-neutral-500 dark:text-neutral-400">
					{registeredDate
						? T['Member since'] + ' ' + new Date(registeredDate).getFullYear()
						: ncUserMeta?.ncBio}
				</span>
			</div>
		</div>
	)
}

export default ModalSelectAuthors
