import { gql, useLazyQuery } from '@apollo/client'
import { FC, useEffect, useRef, useState } from 'react'
import Loading from '../Button/Loading'
import { QUERY_GET_TAGS } from '@/fragments/queries'
import { NcmazFcTagShortFieldsFragmentFragment } from '@/__generated__/graphql'
import ButtonPrimary from '../Button/ButtonPrimary'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import getTrans from '@/utils/getTrans'

const MAX_TAGS_LENGTH =
	NC_SITE_SETTINGS['submissions-settings']?.max_tags_allowed || 5

export interface TagNodeShort extends NcmazFcTagShortFieldsFragmentFragment {}

interface TagsInputProps {
	onChange: (tags: TagNodeShort[]) => void
	defaultValue?: TagNodeShort[]
}

const TagsInput: FC<TagsInputProps> = ({ onChange, defaultValue }) => {
	const T = getTrans()

	const [queryGetTags, { loading, error, data, fetchMore, called }] =
		useLazyQuery(QUERY_GET_TAGS, {
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

	//
	const [inputTextValue, setInputTextValue] = useState('')
	//
	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	let [isOpen, setIsOpen] = useState(false)
	const [tags, setTags] = useState<TagNodeShort[]>(defaultValue || [])

	useEffect(() => {
		if (!isOpen) {
			return
		}
		queryGetTags()
	}, [isOpen])

	useEffect(() => {
		if (tags.length >= MAX_TAGS_LENGTH) {
			setIsOpen(false)
		}

		onChange(tags)
	}, [tags.length])

	function closePopover() {
		setIsOpen(false)
	}

	function openPopover() {
		setIsOpen(true)
	}

	const checkIncludes = (tag: TagNodeShort) => {
		return tags.some((item) => item.name === tag.name)
	}

	const setNewTags = (tag: TagNodeShort) => {
		if (!checkIncludes(tag)) {
			setTags((prevTags) => [...prevTags, tag])
		}
		setInputTextValue('')
		inputRef.current?.focus()
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

	const handleRemoveTag = (tag: TagNodeShort) => {
		setTags(tags.filter((t) => t.name !== tag.name))
		setTimeout(() => {
			inputRef.current?.focus()
		}, 100)
	}

	const tagsData = (data?.tags?.nodes ||
		[]) as NcmazFcTagShortFieldsFragmentFragment[]

	const isMax = tags.length >= MAX_TAGS_LENGTH

	return (
		<div className="relative w-full text-xs sm:text-sm">
			<ul className="flex flex-wrap gap-1.5">
				{tags.map((tag) => (
					<li
						className="flex items-center justify-center rounded-lg bg-neutral-100 px-3 py-2 dark:bg-neutral-800"
						key={tag.databaseId}
					>
						# {tag.name}
						<button
							className="ms-1 flex items-center justify-center px-1 text-base hover:text-neutral-900 dark:hover:text-neutral-50"
							onClick={() => handleRemoveTag(tag)}
							title="Remove tag"
						>
							<XMarkIcon className="h-4 w-4" />
						</button>
					</li>
				))}

				{!isMax && (
					<li>
						{/* <Popover.Button>Solutions</Popover.Button> */}
						<input
							ref={inputRef}
							value={inputTextValue}
							onChange={(e) => {
								const regex = /^[a-zA-Z0-9]*$/ // Cho phép chỉ nhập các ký tự chữ và số
								const value = e.target.value
								const lastChar = value[value.length - 1]

								if (
									(lastChar === ' ' || lastChar === ',') &&
									value.length > 1
								) {
									setNewTags({
										databaseId: Date.now(),
										name: value.replace(/[, ]/g, ''),
										__typename: 'Tag',
									})
									return
								}

								if (regex.test(value)) {
									setInputTextValue(value)
								}
							}}
							className={`${
								tags.length ? 'px-3' : 'px-0'
							} h-full border-none bg-transparent py-2 text-base text-neutral-600 hover:text-neutral-900 focus:outline-none focus:ring-0 disabled:cursor-not-allowed dark:text-neutral-400 dark:hover:text-neutral-300`}
							type="text"
							placeholder={
								!tags.length
									? `${T.pageSubmission['Add tags']} (${tags.length}/${MAX_TAGS_LENGTH})...`
									: `${T.pageSubmission['Add tag']} (${tags.length}/${MAX_TAGS_LENGTH})`
							}
							onFocus={openPopover}
							onKeyUp={(e) => {
								// check if the key is not Enter, Space, Comma
								if (e.key !== 'Enter' && e.key !== 'Tab') {
									return
								}
								setNewTags({
									databaseId: Date.now(),
									name: e.currentTarget.value.replace(/[, ]/g, ''),
									__typename: 'Tag',
								})
							}}
						/>
					</li>
				)}
			</ul>
			<i className="my-1 text-[10px] sm:hidden">
				(For add a tag, press the <code>"Enter"</code>, <code>"Space"</code> or{' '}
				<code>","</code> key after typing.)
			</i>

			{isOpen && (
				<div
					ref={containerRef}
					className="absolute inset-x-0 top-full z-50 mt-4 space-y-5 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/[0.03] dark:bg-neutral-800"
				>
					<h3 className="text-xl font-semibold">{T.Tags}</h3>
					<div className="w-full border-b border-neutral-300 dark:border-neutral-700" />
					{!!error && <p className="text-red-500">{error.message}</p>}
					{!!loading && !tagsData.length && <Loading />}
					{!!tagsData.length ? (
						<ul className="flex flex-wrap gap-2">
							{tagsData.map((tag) => {
								const isSelected = checkIncludes(tag)
								return (
									<li key={tag.databaseId}>
										<button
											className={`flex items-center justify-center rounded-lg px-3 py-2 ${
												isSelected
													? 'bg-neutral-900 text-neutral-50'
													: 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600'
											}`}
											onClick={() => {
												if (isSelected) {
													handleRemoveTag(tag)
													return
												}
												!isMax && setNewTags(tag)
											}}
										>
											#{` `}
											{tag.name} ({tag.count || 0})
										</button>
									</li>
								)
							})}
						</ul>
					) : null}

					{/* SHOW MORE */}
					{data?.tags?.pageInfo.hasNextPage ? (
						<>
							<div className="w-full border-b border-neutral-300 dark:border-neutral-700" />
							<div className="flex justify-center">
								<ButtonPrimary loading={loading} onClick={handleClickShowMore}>
									{T.pageSubmission['Load more tags']}
								</ButtonPrimary>
							</div>
						</>
					) : null}
				</div>
			)}
		</div>
	)
}

export default TagsInput
