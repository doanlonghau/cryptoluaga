'use client'

import { FC } from 'react'
import Link from 'next/link'
import ButtonPlayMusicPlayer from '../ButtonPlayMusicPlayer'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import { CommonPostCardProps } from '../Card2/Card2'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import MyImage from '../MyImage'
import ncFormatDate from '@/utils/formatDate'

export interface Card15PodcastProps extends CommonPostCardProps {}

const Card15Podcast: FC<Card15PodcastProps> = ({
	className = 'h-full',
	post,
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

	const renderDefaultBtnListen = (state?: 'playing') => {
		return (
			<div className="mt-3 inline-flex cursor-pointer items-center rounded-full py-0.5 pe-4 transition-all hover:bg-primary-50 hover:ps-0.5 dark:hover:bg-neutral-900">
				<span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-neutral-800 dark:text-primary-200">
					{state === 'playing' ? (
						<PauseIcon className="h-5 w-5" />
					) : (
						<PlayIcon className="h-5 w-5 rtl:rotate-180" />
					)}
				</span>

				<span className="ms-3 text-xs font-medium sm:text-sm">
					{state === 'playing' ? 'Now playing' : 'Listen now'}
				</span>
			</div>
		)
	}

	return (
		<div
			className={`nc-Card15Podcast group relative flex items-center rounded-3xl border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
		>
			<div className="w-1/4 flex-shrink-0">
				<Link
					href={uri || ''}
					className="aspect-h-1 aspect-w-1 relative block h-0 overflow-hidden rounded-full shadow-lg"
				>
					<MyImage
						className="h-full w-full object-cover"
						src={featuredImage?.sourceUrl || ''}
						fill
						alt={title || ''}
						sizes="100px"
					/>
				</Link>
			</div>

			<div className="ms-4 flex flex-grow flex-col">
				<h2
					className={`nc-card-title block text-sm font-semibold sm:text-base 2xl:text-lg`}
				>
					<Link
						href={uri || ''}
						className={IS_AUDIO ? `line-clamp-1` : 'line-clamp-2'}
						title={title || ''}
						dangerouslySetInnerHTML={{ __html: title }}
					></Link>
				</h2>
				<span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
					{/* {IS_AUDIO ? ` 40 Episode · 110 minutes` : date} */}
					{ncFormatDate(date || '')}
				</span>

				{IS_AUDIO && (
					<ButtonPlayMusicPlayer
						post={post}
						renderDefaultBtn={() => renderDefaultBtnListen()}
						renderPlayingBtn={() => renderDefaultBtnListen('playing')}
					/>
				)}
			</div>
		</div>
	)
}

export default Card15Podcast
