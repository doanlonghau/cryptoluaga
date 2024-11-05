'use client'

import React, { FC } from 'react'
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment'
import NcBookmark from '@/components/NcBookmark/NcBookmark'
import SocialsShareDropdown from '@/components/SocialsShareDropdown/SocialsShareDropdown'
import { FragmentType } from '@/__generated__'
import { NC_POST_FULL_FRAGMENT } from '@/fragments'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import PostActionDropdown from '@/components/PostActionDropdown/PostActionDropdown'
import { useRouter } from 'next/router'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'

export interface Props {
	className?: string
	post: FragmentType<typeof NC_POST_FULL_FRAGMENT>
}

const SingleMetaAction2: FC<Props> = ({ className = '', post }) => {
	const { commentCount, uri, ncPostMetaData, author, databaseId } =
		getPostDataFromPostFragment(post || {})

	const router = useRouter()
	const IS_PREVIEW = router.pathname === '/preview'
	if (IS_PREVIEW) {
		return null
	}

	return (
		<div className={`nc-SingleMetaAction2 ${className}`}>
			<div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
				<PostCardLikeAndComment
					hiddenCommentOnMobile={false}
					useOnSinglePage
					commentCount={commentCount || 0}
					likeCount={ncPostMetaData?.likesCount || 0}
					postDatabseId={databaseId}
					linkToPost={uri}
					showViewCount={NC_SITE_SETTINGS['single_page']?.show_view_cout}
					showCommentCount={NC_SITE_SETTINGS['single_page']?.show_comment_count}
					viewCount={ncPostMetaData?.viewsCount || 1}
				/>
				<div className="pr-1">
					<div className="h-5 border-s border-neutral-200 sm:h-6 dark:border-neutral-700" />
				</div>

				<NcBookmark
					postDatabseId={databaseId}
					containerClassName="h-9 w-9 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
				/>
				<SocialsShareDropdown />
				<PostActionDropdown
					containerClassName="h-9 w-9 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
					iconClass="h-5 w-5"
					post={post}
					isSingle
				/>
			</div>
		</div>
	)
}

export default SingleMetaAction2
