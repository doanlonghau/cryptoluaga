'use client'

import Heading from '@/components/Heading/Heading'
import NcPlayIcon from '@/components/NcPlayIcon/NcPlayIcon'
import NcPlayIcon2 from '@/components/NcPlayIcon2/NcPlayIcon2'
import { FC, Fragment, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import isSafariBrowser from '@/utils/isSafariBrowser'
import Image from 'next/image'
import MyImage from '../MyImage'

export interface VideoType {
	id: string
	title: string
	thumbnail: string
}

export interface SectionVideosProps {
	videos?: VideoType[]
	className?: string
}

const VIDEOS_DEMO: VideoType[] = [
	{
		id: 'iItiK76LJPY',
		title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
		thumbnail:
			'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
	},
	{
		id: 'a5V6gdu5ih8',
		title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
		thumbnail:
			'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
	},
	{
		id: 'MuB7HHeuNbc',
		title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
		thumbnail:
			'https://images.unsplash.com/photo-1551946581-f7a62cd2f00b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=330&q=80',
	},
	{
		id: 'eEaZvEZye84',
		title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
		thumbnail:
			'https://images.unsplash.com/photo-1487875961445-47a00398c267?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
	},
	{
		id: 'YK4u38DDlJY',
		title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
		thumbnail:
			'https://images.unsplash.com/photo-1576359877473-d92bc837facc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
	},
]

const SectionVideos: FC<SectionVideosProps> = ({
	videos = VIDEOS_DEMO,
	className = '',
}) => {
	const [isPlay, setIsPlay] = useState(false)
	const [currentVideo, setCurrentVideo] = useState(0)
	const [isRendered, setIsRendered] = useState(false)

	useEffect(() => {
		setIsRendered(true)
	}, [])

	const renderMainVideo = () => {
		const video: VideoType = videos[currentVideo]

		return (
			<div
				className="group aspect-h-16 aspect-w-16 z-0 overflow-hidden rounded-3xl border-4 border-white bg-neutral-800 sm:aspect-h-9 sm:rounded-[50px] sm:border-[10px] dark:border-neutral-900"
				title={video.title}
			>
				{isSafariBrowser() ? (
					<Fragment>
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${video.id}`}
							style={{
								opacity: isPlay ? 1 : 0,
								display: isPlay ? 'block' : 'none',
							}}
							playing={isPlay}
							controls
							width="100%"
							height="100%"
						/>
						{!isPlay && (
							<Fragment>
								<div
									onClick={() => setIsPlay(true)}
									className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center"
								>
									<NcPlayIcon />
								</div>
								<MyImage
									className="object-cover transition-transform duration-300 group-hover:scale-105"
									src={video.thumbnail}
									title={video.title}
									alt={video.title}
									fill
									sizes="(max-width: 600px) 480px, 800px"
								/>
							</Fragment>
						)}
					</Fragment>
				) : (
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${video.id}`}
						playing={true}
						controls
						width="100%"
						height="100%"
						light={video.thumbnail}
						playIcon={<NcPlayIcon />}
					/>
				)}
			</div>
		)
	}

	const renderSubVideo = (video: VideoType, index: number) => {
		if (index === currentVideo) return null
		return (
			<div
				className="group aspect-h-16 aspect-w-16 relative z-0 cursor-pointer overflow-hidden rounded-2xl sm:aspect-h-12 lg:aspect-h-9 sm:rounded-3xl"
				onClick={() => {
					setCurrentVideo(index)
					!isPlay && setIsPlay(true)
				}}
				title={video.title}
				key={String(index)}
			>
				<div className="absolute inset-0 z-10 flex items-center justify-center">
					<NcPlayIcon2 />
				</div>
				<MyImage
					sizes="(max-width: 600px) 480px, 800px"
					className="object-cover transition-transform duration-300 group-hover:scale-110"
					src={video.thumbnail}
					fill
					title={video.title}
					alt={video.title}
				/>
			</div>
		)
	}

	return (
		<div className={`nc-SectionVideos ${className}`}>
			<Heading
				desc="Check out our hottest videos. View more and share more new
          perspectives on just about any topic. Everyone’s welcome."
			>
				🎬 The Videos
			</Heading>

			<div className="relative flex flex-col sm:py-4 sm:pr-4 md:py-6 md:pr-6 lg:flex-row xl:py-14 xl:pr-14">
				<div className="absolute -bottom-4 -right-4 -top-4 z-0 w-2/3 rounded-3xl bg-primary-100/40 sm:rounded-[50px] md:bottom-0 md:right-0 md:top-0 xl:w-1/2 dark:bg-neutral-800/40"></div>
				<div className="relative flex-grow pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
					{isRendered && renderMainVideo()}
				</div>
				<div className="grid flex-shrink-0 grid-cols-4 gap-2 sm:gap-6 lg:w-36 lg:grid-cols-1 xl:w-40">
					{isRendered && videos.map(renderSubVideo)}
				</div>
			</div>
		</div>
	)
}

export default SectionVideos
