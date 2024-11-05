'use client'

import { FC, useEffect, useRef } from 'react'
import Avatar from '@/components/Avatar/Avatar'
import Link from 'next/link'
import { getImageDataFromImageFragment } from '@/utils/getImageDataFromImageFragment'
import ncFormatDate from '@/utils/formatDate'
import { TComment } from './CommentCard'
import SingleCommentForm from '@/container/singles/SingleCommentForm'

export interface CommentCardFakeProps {
	className?: string
	comment: TComment
	size?: 'large' | 'normal'
	handleSubmitFormReply: (data: { comment: TComment; data: string }) => void
	handleCancelFormReply: () => void
}

const CommentCardFake: FC<CommentCardFakeProps> = ({
	className = '',
	comment,
	size = 'large',
	handleSubmitFormReply,
	handleCancelFormReply,
}) => {
	const { id, date, content, author, databaseId } = comment || {}

	const fakeCommentRef = useRef<HTMLDivElement>(null)

	// chi duy nhat 1 component nay duoc render tai 1 thoi diem
	// nen co the su dung cach nay
	useEffect(() => {
		fakeCommentRef.current?.scrollIntoView({
			behavior: 'auto',
			block: 'center',
		})
	}, [fakeCommentRef])

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

	return (
		<>
			<div
				className={`nc-CommentCardFake flex gap-[6px] sm:gap-[12px] ${className}`}
				id={'comment-fake-' + id}
				ref={fakeCommentRef}
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
				<div className="nc-CommentCardFake__box flex flex-1 flex-col overflow-hidden p-2 text-sm sm:pt-3 sm:text-base">
					{/* AUTHOR INFOR */}
					<div className="space-y-1">
						<div className="relative flex items-center">
							{author?.node.__typename === 'User' && (
								<Link
									className="flex-shrink-0 font-semibold capitalize text-neutral-800 dark:text-neutral-100"
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
					</div>

					<SingleCommentForm
						onClickSubmit={data => {
							handleSubmitFormReply({ comment, data })
						}}
						onClickCancel={handleCancelFormReply}
						className="mt-2.5"
						isAutoFocus
						isReplyingComment
					/>
				</div>
			</div>
		</>
	)
}

export default CommentCardFake
