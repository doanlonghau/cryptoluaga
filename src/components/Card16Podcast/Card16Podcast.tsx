'use client'

import { FC } from 'react'
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment'
import Link from 'next/link'
import ButtonPlayMusicPlayer from '../ButtonPlayMusicPlayer'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import { CommonPostCardProps } from '../Card2/Card2'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import MyImage from '../MyImage'

export interface Card16PodcastProps extends CommonPostCardProps {
	ratio?: string
}

const Card16Podcast: FC<Card16PodcastProps> = ({
	className = 'h-full',
	post,
	ratio = 'aspect-w-4 sm:aspect-w-3 xl:aspect-w-4 aspect-h-3',
}) => {
	const {
		title,
		link,
		date,
		categories,
		excerpt,
		author,
		postFormats,
		featuredImage,
		ncPostMetaData,
		commentCount,
		uri,
		databaseId,
	} = getPostDataFromPostFragment(post)

	const IS_AUDIO = postFormats === 'audio'

	const renderListenButtonDefault = (state?: 'playing') => {
		return (
			<div
				className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-neutral-50 text-primary-500`}
			>
				{state === 'playing' ? (
					<PauseIcon className="h-8 w-8" />
				) : (
					<PlayIcon className="ms-0.5 h-8 w-8 rtl:rotate-180" />
				)}
			</div>
		)
	}

	return (
		<div className={`nc-Card16Podcast relative flex flex-col ${className}`}>
			<Link
				href={uri || ''}
				className={`relative block w-full flex-shrink-0 overflow-hidden rounded-3xl ${ratio}`}
			>
				<MyImage
					fill
					alt=""
					sizes="(max-width: 600px) 480px, 800px"
					src={featuredImage?.sourceUrl || ''}
					className="object-cover"
				/>
				<span className="bg-neutral-900 bg-opacity-30"></span>
			</Link>

			{/* ABSOLUTE */}
			<Link href={uri || ''} className="absolute inset-0"></Link>
			<span className="absolute inset-x-3 top-3">
				<CategoryBadgeList categories={categories?.nodes || []} />
			</span>

			{/* MAIN CONTENT */}
			<div className="-mt-32 w-11/12 transform">
				<div
					className={`flex items-center space-x-4 px-5 rtl:space-x-reverse ${
						!IS_AUDIO ? 'relative z-[-1] opacity-0' : ''
					}`}
				>
					<div className={`flex-grow`}>
						<MyImage
							src={'/images/musicWave.png'}
							width={200}
							height={30}
							alt="musicWave"
						/>
					</div>
					<ButtonPlayMusicPlayer
						post={post}
						renderDefaultBtn={() => renderListenButtonDefault()}
						renderPlayingBtn={() => renderListenButtonDefault('playing')}
					/>
				</div>
				<div className="mt-5 flex flex-grow flex-col rounded-3xl rounded-ss-none bg-white p-5 shadow-xl dark:bg-neutral-900 dark:shadow-2xl">
					<h2 className="nc-card-title block font-semibold text-neutral-900 sm:text-lg 2xl:text-xl dark:text-neutral-100">
						<Link
							dangerouslySetInnerHTML={{ __html: title }}
							href={uri || ''}
							className="line-clamp-1"
							title={title || ''}
						></Link>
					</h2>
					<div className="mb-5 mt-3 block text-sm text-neutral-500 dark:text-neutral-400">
						<div
							dangerouslySetInnerHTML={{ __html: excerpt || '' }}
							className="line-clamp-2"
						></div>
					</div>
					<div className="mt-auto flex items-end justify-between">
						<PostCardLikeAndComment
							className="relative"
							commentCount={commentCount || 0}
							linkToPost={uri || ''}
							likeCount={ncPostMetaData?.likesCount || 0}
							postDatabseId={databaseId || 0}
							viewCount={ncPostMetaData?.viewsCount || 0}
						/>
						<PostCardSaveAction
							className="relative"
							readingTime={ncPostMetaData?.readingTime || 1}
							postDatabseId={databaseId || 0}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card16Podcast
