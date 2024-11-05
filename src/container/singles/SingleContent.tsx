'use client'

import { FC, forwardRef, useEffect, useRef, useState } from 'react'
import Tag from '@/components/Tag/Tag'
import SingleAuthor from './SingleAuthor'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import PostCardLikeAction from '@/components/PostCardLikeAction/PostCardLikeAction'
import PostCardCommentBtn from '@/components/PostCardCommentBtn/PostCardCommentBtn'
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import { GetPostSiglePageQuery } from '@/__generated__/graphql'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import NcBookmark from '@/components/NcBookmark/NcBookmark'
import SingleCommentWrap from './SingleCommentWrap'
import { Transition } from '@headlessui/react'
import TableContentAnchor from './TableContentAnchor'
import Alert from '@/components/Alert'
import { clsx } from 'clsx'
import { useMusicPlayer } from '@/hooks/useMusicPlayer'

export interface SingleContentProps {
	post: GetPostSiglePageQuery['post']
}

const SingleContent: FC<SingleContentProps> = ({ post }) => {
	const endedAnchorRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const progressRef = useRef<HTMLButtonElement>(null)
	//
	const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)
	//

	const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
		threshold: 0,
		root: null,
		rootMargin: '0%',
		freezeOnceVisible: false,
	})

	//
	const {
		content,
		author,
		databaseId,
		commentCount,
		commentStatus,
		tags,
		status,
		date,
	} = getPostDataFromPostFragment(post || {})

	//

	useEffect(() => {
		const handleProgressIndicator = () => {
			const entryContent = contentRef.current
			const progressBarContent = progressRef.current

			if (!entryContent || !progressBarContent) {
				return
			}

			const totalEntryH = entryContent.offsetTop + entryContent.offsetHeight
			let winScroll =
				document.body.scrollTop || document.documentElement.scrollTop

			let scrolled = totalEntryH ? (winScroll / totalEntryH) * 100 : 0

			progressBarContent.innerText = scrolled.toFixed(0) + '%'

			if (scrolled >= 100) {
				setIsShowScrollToTop(true)
			} else {
				setIsShowScrollToTop(false)
			}
		}

		const handleProgressIndicatorHeadeEvent = () => {
			window?.requestAnimationFrame(handleProgressIndicator)
		}
		handleProgressIndicator()
		window?.addEventListener('scroll', handleProgressIndicatorHeadeEvent)
		return () => {
			window?.removeEventListener('scroll', handleProgressIndicatorHeadeEvent)
		}
	}, [])

	const renderAlert = () => {
		if (status === 'publish') {
			return null
		}
		if (status === 'future') {
			return (
				<Alert type="warning">
					This post is scheduled. It will be published on {date}.
				</Alert>
			)
		}
		return (
			<>
				<Alert type="warning">
					This post is {status}. It will not be visible on the website until it
					is published.
				</Alert>
			</>
		)
	}

	const showLikeAndCommentSticky =
		!endedAnchorEntry?.intersectionRatio &&
		(endedAnchorEntry?.boundingClientRect.top || 0) > 0

	return (
		<div className="relative flex flex-col">
			<div className="nc-SingleContent flex-1 space-y-10">
				{/*    */}
				{renderAlert()}

				{/* ENTRY CONTENT */}
				<div
					// not remove this id
					id="single-entry-content"
					className="prose mx-auto max-w-screen-md lg:prose-lg dark:prose-invert"
					ref={contentRef}
					dangerouslySetInnerHTML={{ __html: content }}
				/>

				{/* TAGS */}
				{tags?.nodes?.length ? (
					<div className="mx-auto flex max-w-screen-md flex-wrap">
						{tags.nodes.map(item => (
							<Tag
								hideCount
								key={item.databaseId}
								name={'#' + (item.name || '')}
								uri={item.uri || ''}
								className="mb-2 me-2 border border-neutral-200 dark:border-neutral-800"
							/>
						))}
					</div>
				) : null}

				{/* AUTHOR */}
				<div className="mx-auto max-w-screen-md border-b border-t border-neutral-100 dark:border-neutral-700"></div>
				<div className="mx-auto max-w-screen-md">
					<SingleAuthor author={author} />
				</div>

				{/* COMMENTS LIST - not delete comments id */}
				{commentStatus === 'open' ? (
					<div
						id="comments"
						className="mx-auto max-w-screen-md scroll-mt-10 sm:scroll-mt-20"
					>
						<SingleCommentWrap
							commentCount={commentCount || 0}
							postDatabaseId={databaseId}
						/>
					</div>
				) : null}
				<div className="!my-0" ref={endedAnchorRef}></div>
			</div>

			{/* sticky action */}
			<StickyAction
				showLikeAndCommentSticky={showLikeAndCommentSticky}
				isShowScrollToTop={isShowScrollToTop}
				post={post}
				ref={progressRef}
			/>
		</div>
	)
}

const StickyAction = forwardRef(function (
	{
		showLikeAndCommentSticky,
		post,
		isShowScrollToTop,
	}: {
		showLikeAndCommentSticky: boolean
		post: GetPostSiglePageQuery['post']
		isShowScrollToTop: boolean
	},
	progressRef,
) {
	//
	const { content, databaseId, ncPostMetaData, uri, commentCount } =
		getPostDataFromPostFragment(post || {})

	const { postData: musicPlayerPostData } = useMusicPlayer()

	const hasMusic = musicPlayerPostData?.databaseId
	const stickyActionClassName = clsx(
		'sticky z-40 mt-8 inline-flex self-center',
		hasMusic ? 'bottom-14 sm:bottom-14' : 'bottom-5 sm:bottom-8',
	)

	return (
		<div className={stickyActionClassName}>
			<Transition
				as={'div'}
				show={showLikeAndCommentSticky}
				enter="transition-opacity duration-75"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				className={
					'inline-flex items-center justify-center gap-1 self-center sm:gap-2'
				}
			>
				<>
					<div className="flex items-center justify-center gap-1 rounded-full bg-white p-1.5 text-xs shadow-lg ring-1 ring-neutral-900/5 ring-offset-1 sm:gap-2 dark:bg-neutral-800">
						<PostCardLikeAction
							likeCount={ncPostMetaData?.likesCount || 0}
							postDatabseId={databaseId}
						/>
						<div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>
						<PostCardCommentBtn
							isATagOnSingle
							commentCount={commentCount || 0}
							linkToPost={uri || ''}
						/>
						<div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>
						<NcBookmark postDatabseId={databaseId} />
						<div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>

						<button
							className={`h-9 w-9 items-center justify-center rounded-full bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 ${
								isShowScrollToTop ? 'flex' : 'hidden'
							}`}
							onClick={() => {
								window.scrollTo({ top: 0, behavior: 'smooth' })
							}}
							title="Go to top"
						>
							<ArrowUpIcon className="h-4 w-4" />
						</button>

						<button
							ref={progressRef as any}
							className={`h-9 w-9 items-center justify-center ${
								isShowScrollToTop ? 'hidden' : 'flex'
							}`}
							title="Go to top"
							onClick={() => {
								window.scrollTo({ top: 0, behavior: 'smooth' })
							}}
						>
							%
						</button>
					</div>

					<TableContentAnchor
						className="flex items-center justify-center gap-2 rounded-full bg-white p-1.5 text-xs shadow-lg ring-1 ring-neutral-900/5 ring-offset-1 dark:bg-neutral-800"
						content={content}
					/>
				</>
			</Transition>
		</div>
	)
})

export default SingleContent
