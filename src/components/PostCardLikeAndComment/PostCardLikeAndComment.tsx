import { FC } from 'react'
import PostCardCommentBtn, {
	PostCardCommentBtnProps,
} from '@/components/PostCardCommentBtn/PostCardCommentBtn'
import PostCardLikeAction, {
	PostCardLikeActionProps,
} from '@/components/PostCardLikeAction/PostCardLikeAction'
import PostCardViewCount from '../PostCardCommentBtn/PostCardViewCount'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import { usePathname } from 'next/navigation'

export interface PostCardLikeAndCommentProps
	extends Omit<PostCardLikeActionProps, ''>,
		Omit<PostCardCommentBtnProps, 'isATagOnSingle'> {
	className?: string
	itemClass?: string
	hiddenCommentOnMobile?: boolean
	useOnSinglePage?: boolean
	viewCount?: number
	showViewCount?: boolean
	showCommentCount?: boolean
}

const PostCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
	className = '',
	itemClass,
	hiddenCommentOnMobile = true,
	useOnSinglePage = false,
	likeCount,
	commentCount,
	linkToPost,
	postDatabseId,
	showViewCount = NC_SITE_SETTINGS['post_card']?.show_view_cout,
	showCommentCount = NC_SITE_SETTINGS['post_card']?.show_comment_count,
	viewCount = 0,
}) => {
	const pathName = usePathname()

	if (pathName?.startsWith('/ncmaz_for_ncmazfc_preview_blocks')) {
		return null
	}

	return (
		<div
			className={`nc-PostCardLikeAndComment flex items-center gap-2 sm:gap-2.5 ${className}`}
		>
			<PostCardLikeAction
				className={itemClass}
				likeCount={likeCount}
				postDatabseId={postDatabseId}
			/>
			{showCommentCount && (
				<PostCardCommentBtn
					className={`${
						hiddenCommentOnMobile ? 'hidden sm:flex' : 'flex'
					} ${itemClass}`}
					isATagOnSingle={useOnSinglePage}
					linkToPost={linkToPost}
					commentCount={commentCount}
				/>
			)}
			{showViewCount && (
				<PostCardViewCount
					className={`${
						hiddenCommentOnMobile ? 'hidden sm:flex' : 'flex'
					} ${itemClass}`}
					viewCount={viewCount || 1}
				/>
			)}
		</div>
	)
}

export default PostCardLikeAndComment
