import React, { FC } from 'react'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import CommentCard, {
	TCommentHasChild,
} from '@/components/CommentCard/CommentCard'
import CommentCardSkeleton from '@/components/CommentCard/CommentCardSkeleton'
import CommentCardFake from '@/components/CommentCard/CommentCardFake'
import getTrans from '@/utils/getTrans'

export interface SingleCommentListsProps {
	postDatabaseId: number
	aDataHierarchical: TCommentHasChild[] | null
	loading?: boolean
	hasNextPage?: boolean
	onLoadmoreComments?: () => void
	onClickReply?: (comment: TCommentHasChild) => void
	onClickEdit?: (comment: TCommentHasChild) => void
	onClickDelete?: (comment: TCommentHasChild) => void
	onSubmitFormReply: (data: { comment: TCommentHasChild; data: string }) => void
	onCancelFormReply: () => void
}

const SingleCommentLists: FC<SingleCommentListsProps> = ({
	postDatabaseId,
	aDataHierarchical,
	loading,
	onLoadmoreComments,
	onClickDelete,
	onClickEdit,
	onClickReply,
	hasNextPage,
	onSubmitFormReply,
	onCancelFormReply,
}) => {
	const T = getTrans()

	const renderCommentCard = (
		comment: TCommentHasChild,
		index: number,
		arr: TCommentHasChild[],
		lv2 = false,
	) => {
		// new comment.parentId = null, thi day se la Lv1
		const isLast = index === arr.length - 1
		return (
			<li className="relative space-y-[20px]" key={comment.databaseId}>
				{comment.parentId && !isLast ? (
					<div
						className={`absolute -bottom-[24px] end-auto top-0 border-s-2 border-neutral-200 dark:border-neutral-800 ${
							!lv2
								? '-start-[18px] w-3.5 sm:-start-[27px] sm:w-5'
								: '-start-[21px] w-4 sm:-start-[29px] sm:w-5'
						}`}
					></div>
				) : null}

				<div className="relative">
					{comment.children?.length ? (
						<div
							className={`absolute -bottom-[24px] end-auto border-r-2 border-neutral-200 dark:border-neutral-800 ${
								comment.parentId
									? 'start-[12px] top-[40px] sm:start-[13px] sm:top-[46px]'
									: 'start-[13px] top-[44px] sm:start-[15px] sm:top-[50px]'
							}`}
						></div>
					) : null}

					{comment.parentId ? (
						<div
							className={`absolute end-auto top-0 rounded-[10px] rounded-ee-none rounded-ss-none border-b-2 border-s-2 border-neutral-200 dark:border-neutral-800 ${
								!lv2
									? '-start-[18px] h-5 w-3.5 sm:-start-[27px] sm:h-7 sm:w-5'
									: '-start-[21px] h-5 w-4 sm:-start-[29px] sm:h-7 sm:w-5'
							}`}
						></div>
					) : null}

					{comment.id.includes('fake-for-reply-') ? (
						<CommentCardFake
							size={comment.parentId ? 'normal' : 'large'}
							comment={comment}
							handleSubmitFormReply={onSubmitFormReply}
							handleCancelFormReply={onCancelFormReply}
						/>
					) : (
						<CommentCard
							size={comment.parentId ? 'normal' : 'large'}
							comment={comment}
							onClickDelete={onClickDelete}
							onClickEdit={onClickEdit}
							onClickReply={onClickReply}
						/>
					)}
				</div>
				{comment.children?.length ? (
					<ul
						className={`space-y-[20px] ${
							comment.parentId
								? 'ps-[30px] sm:ps-[40px]'
								: 'ps-[34px] sm:ps-[44px]'
						}`}
					>
						{comment.children?.map((i, j, a) =>
							renderCommentCard(i, j, a, !comment.parentId),
						)}
					</ul>
				) : null}
			</li>
		)
	}

	if (!aDataHierarchical?.length && !loading) {
		return null
	}

	return (
		<div className="">
			{/* lists */}
			<div className="mt-10 overflow-hidden">
				<ul className="nc-SingleCommentLists space-y-5">
					{!aDataHierarchical?.length && loading ? (
						<>
							<CommentCardSkeleton />
							<CommentCardSkeleton />
							<CommentCardSkeleton />
						</>
					) : null}

					{aDataHierarchical?.map(renderCommentCard)}
				</ul>
			</div>

			{hasNextPage ? (
				<div className="mt-8 flex items-center justify-center">
					<ButtonPrimary onClick={onLoadmoreComments} loading={loading}>
						{T.pageSingle['Show more comments']}
					</ButtonPrimary>
				</div>
			) : null}
		</div>
	)
}

export default SingleCommentLists
