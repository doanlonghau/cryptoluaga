import Link from 'next/link'
import { FC } from 'react'
import { CommentIcon } from '../Icons/Icons'

export interface PostCardCommentBtnProps {
	className?: string
	sizeClassName?: string
	isATagOnSingle?: boolean
	commentCount: number
	linkToPost: string
}

const PostCardCommentBtn: FC<PostCardCommentBtnProps> = ({
	className = '',
	sizeClassName = 'w-9 h-9',
	isATagOnSingle = false,
	commentCount = 0,
	linkToPost = '',
}) => {
	const renderContent = () => {
		return (
			<>
				<div
					className={`flex flex-shrink-0 items-center justify-center rounded-full bg-neutral-50 transition-colors duration-75 group-hover/PostCardCommentBtn:bg-teal-50 dark:bg-neutral-800 dark:group-hover/PostCardCommentBtn:bg-teal-100 ${sizeClassName}`}
				>
					<CommentIcon />
				</div>

				<span className="ms-2 min-w-[1.125rem] flex-shrink-0 text-start text-neutral-900 transition-colors duration-100 dark:text-neutral-200">
					{commentCount}
				</span>
			</>
		)
	}

	const classess = `nc-PostCardCommentBtn group/PostCardCommentBtn relative flex items-center text-neutral-600 transition-colors dark:text-neutral-200 hover:text-teal-600 dark:hover:text-teal-500 ${className} text-xs`

	if (isATagOnSingle) {
		return (
			<a href={'#comments'} className={classess} title="Comments">
				{renderContent()}
			</a>
		)
	}

	return (
		<Link href={`${linkToPost}#comments`} className={classess} title="Comments">
			{renderContent()}
		</Link>
	)
}

export default PostCardCommentBtn
