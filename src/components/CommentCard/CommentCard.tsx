'use client'

import { FC, useContext } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import twFocusClass from '@/utils/twFocusClass'
import Link from 'next/link'
import {
	CommentStatusEnum,
	NcmazFcCommentFullFieldsFragment,
} from '@/__generated__/graphql'
import { getImageDataFromImageFragment } from '@/utils/getImageDataFromImageFragment'
import ncFormatDate from '@/utils/formatDate'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores/store'
import { CommentWrapContext } from '@/container/singles/SingleCommentWrap'
import Loading from '../Button/Loading'
import toast from 'react-hot-toast'
import { useLoginModal } from '@/hooks/useLoginModal'
import getTrans from '@/utils/getTrans'

const T = getTrans()

export type TComment = NcmazFcCommentFullFieldsFragment

export type TCommentHasChild = TComment & {
	children?: TComment[]
}

export interface CommentCardProps {
	className?: string
	comment: TComment
	size?: 'large' | 'normal'
	onClickReply?: (comment: TComment) => void
	onClickEdit?: (comment: TComment) => void
	onClickDelete?: (comment: TComment) => void
}

const CommentCard: FC<CommentCardProps> = ({
	className = '',
	comment,
	size = 'large',
	onClickDelete,
	onClickEdit,
	onClickReply,
}) => {
	const { id, date, content, author, databaseId } = comment || {}
	const { isReady, isAuthenticated } = useSelector(
		(state: RootState) => state.viewer.authorizedUser,
	)
	const { openLoginModal } = useLoginModal()
	const { viewer } = useSelector((state: RootState) => state.viewer)

	const isShowDeleteAndEditButton =
		viewer?.capabilities?.includes('edit_others_posts') ||
		(viewer?.databaseId === author?.node.databaseId &&
			viewer?.capabilities?.includes('edit_posts'))
	//

	let {
		isDeleteCommentsByIdLoading,
		isDeletingDatabaseId,
		isUpdateCommentByIdLoading,
		isEditingDatabaseId,
	} = useContext(CommentWrapContext)
	//

	const getAuthorAvatar = () => {
		if (author?.node.__typename === 'CommentAuthor') {
			return author?.node?.avatar?.url || ''
		}
		if (author?.node.__typename === 'User') {
			return (
				getImageDataFromImageFragment(
					author?.node?.ncUserMeta?.featuredImage?.node,
				).sourceUrl || ''
			)
		}
	}

	const handleClickReplyBtn = () => {
		if (!isReady) {
			toast.error('Please wait a moment, data is being prepared.')
			return
		}

		// open login modal when click reply if not login
		if (isAuthenticated === false) {
			openLoginModal()
			return
		}

		// open login modal when click reply if not login
		if (!viewer?.databaseId) {
			toast.error('Please wait a moment, data is being prepared.')
			return
		}

		// open reply form
		onClickReply?.(comment)
	}

	return (
		<>
			<div
				className={`nc-CommentCard flex gap-[6px] sm:gap-[12px] ${className}`}
				id={'comment-' + databaseId}
			>
				<Avatar
					sizeClass={`${
						size === 'large'
							? 'text-sm sm:text-base w-[28px] h-[28px] sm:h-[32px] sm:w-[32px]'
							: 'w-[24px] h-[24px] sm:h-[28px] sm:w-[28px] text-sm'
					}`}
					radius="rounded-full"
					containerClassName="mt-[8px] sm:mt-[14px] flex-shrink-0"
					imgUrl={getAuthorAvatar()}
					userName={author?.node.name || 'N'}
				/>
				<div className="nc-CommentCard__box flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-200 p-2 text-sm sm:p-4 sm:text-base dark:border-neutral-700">
					{/* AUTHOR INFOR */}
					<div className="space-y-1">
						<div className="relative flex items-center">
							{author?.node.__typename === 'User' && (
								<Link
									className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
									href={author?.node.uri || '/'}
								>
									{author.node.name}
								</Link>
							)}

							{author?.node.__typename === 'CommentAuthor' && (
								<a
									target="_blank"
									rel="noopener noreferrer"
									className="flex-shrink-0 text-xs font-semibold text-neutral-800 sm:text-sm dark:text-neutral-100"
									href={author?.node.url || '/'}
								>
									{author.node.name}
								</a>
							)}
							<span className="mx-2">·</span>
							<span className="line-clamp-1 text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
								{ncFormatDate(date || '')}
							</span>
						</div>
						{comment.status !== CommentStatusEnum.Approve ? (
							<span className="text-xs italic text-neutral-700 dark:text-neutral-300">
								(This comment is pending approval.)
							</span>
						) : null}
					</div>

					{/* CONTENT */}
					<div
						dangerouslySetInnerHTML={{ __html: content || '' }}
						className="prose-sm mb-3 mt-2 block max-w-none dark:prose-invert sm:mb-4 sm:mt-3"
					></div>

					{/* ACTION  REPLY / DELETE/ EDIT */}
					<div className="flex flex-wrap gap-2">
						{comment.status === CommentStatusEnum.Approve ? (
							<button
								className={`inline-flex h-8 min-w-[68px] items-center self-start rounded-full bg-neutral-100 px-3 text-neutral-600 hover:bg-teal-50 hover:text-teal-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:text-teal-500 ${twFocusClass()} `}
								title="Reply"
								onClick={handleClickReplyBtn}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="me-2 h-[18px] w-[18px]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
									/>
								</svg>
								<span className="text-xs leading-none">{T['Reply']}</span>
							</button>
						) : null}

						{/* Edit */}
						{isShowDeleteAndEditButton ? (
							<button
								className={`inline-flex h-8 min-w-[68px] items-center self-start rounded-full bg-neutral-100 px-3 text-neutral-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:text-indigo-500 ${twFocusClass()} `}
								title="Edit comment"
								onClick={() => onClickEdit?.(comment)}
							>
								{isEditingDatabaseId === comment.databaseId &&
								isUpdateCommentByIdLoading ? (
									<Loading />
								) : (
									<svg
										className="me-2 h-[18px] w-[18px]"
										width={24}
										height={24}
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeMiterlimit={10}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeMiterlimit={10}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M3 22H21"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeMiterlimit={10}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								)}
								<span className="text-xs leading-none">{T['Edit']}</span>
							</button>
						) : null}

						{/* Delete */}
						{isShowDeleteAndEditButton ? (
							<button
								className={`inline-flex h-8 min-w-[68px] items-center self-start rounded-full bg-neutral-100 px-3 text-neutral-600 hover:bg-rose-100/80 hover:text-rose-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:text-rose-500 ${twFocusClass()} `}
								title="Delete comment"
								onClick={() => onClickDelete?.(comment)}
							>
								{isDeletingDatabaseId === comment.databaseId &&
								isDeleteCommentsByIdLoading ? (
									<Loading />
								) : (
									<svg
										className="me-2 h-[18px] w-[18px]"
										width={24}
										height={24}
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M10.33 16.5H13.66"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M9.5 12.5H14.5"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								)}
								<span className="text-xs leading-none">{T['Delete']}</span>
							</button>
						) : null}
					</div>
				</div>
			</div>
		</>
	)
}

export default CommentCard
