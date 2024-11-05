'use client'

import LoadingVideo from '@/components/LoadingVideo/LoadingVideo'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { FC, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

export interface MediaVideoProps {
	videoUrl: string
	isHover: boolean
}

const MediaVideo: FC<MediaVideoProps> = ({ videoUrl, isHover }) => {
	const [isMuted, setIsMuted] = useState(true)
	const [showDescUnmuted, setShowDescUnmuted] = useState(true)
	const [isPlaying, setIsPlaying] = useState(false)
	let __timeOut: NodeJS.Timeout | null = null

	useEffect(() => {
		return () => {
			__timeOut && clearTimeout(__timeOut)
		}
	}, [__timeOut])

	return (
		<div className="nc-MediaVideo">
			<ReactPlayer
				url={videoUrl}
				muted={isMuted}
				playing={isHover}
				style={{
					opacity: isPlaying ? 1 : 0,
				}}
				className={`absolute inset-0 bg-neutral-900 transition-opacity`}
				width="100%"
				height="100%"
				onStart={() => {
					setIsPlaying(true)
					__timeOut && clearTimeout(__timeOut)
					__timeOut = setTimeout(() => {
						setShowDescUnmuted(false)
					}, 2500)
				}}
			/>
			<div
				className={`${
					isPlaying ? 'opacity-0' : 'opacity-100'
				} absolute inset-0 flex items-center justify-center bg-neutral-900/30 transition-opacity`}
			>
				<LoadingVideo />
			</div>
			{isPlaying && (
				<div
					className={`absolute bottom-2 start-2 z-20 flex h-6 transform items-center justify-center rounded-full bg-black bg-opacity-70 text-sm text-white transition-transform ${
						showDescUnmuted ? 'pe-2 ps-[6px]' : 'w-6 hover:scale-125'
					}`}
					onClick={() => setIsMuted(!isMuted)}
				>
					{isMuted ? (
						<>
							<SpeakerXMarkIcon className="h-3.5 w-3.5" />
							{showDescUnmuted && (
								<span className="ms-1 inline-block text-[9px]">
									Click here to unmute
								</span>
							)}
						</>
					) : (
						<SpeakerWaveIcon className="h-3.5 w-3.5" />
					)}
				</div>
			)}
		</div>
	)
}

export default MediaVideo
