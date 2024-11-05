'use client'

import {
	FC,
	LegacyRef,
	useRef,
	useState,
	ChangeEvent,
	useEffect,
	useMemo,
} from 'react'
import _ from 'lodash'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { useMusicPlayer } from '@/hooks/useMusicPlayer'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import dynamic from 'next/dynamic'
const DynamicPlayerContent = dynamic(() => import('./PlayerContent'))

export interface MusicPlayerProps {}

const MusicPlayer: FC<MusicPlayerProps> = ({}) => {
	const playerRef: LegacyRef<ReactPlayer> | undefined = useRef(null)

	const {
		duration,
		muted,
		playbackRate,
		playing,
		volume,
		playedSeconds,
		postData,
		setDuration,
		setLoaded,
		setMuted,
		setPlayed,
		setPlaying,
		setVolume,
		setplaybackRate,
		setPlayedSeconds,
		setLoadedSeconds,
	} = useMusicPlayer()

	const { ncmazAudioUrl } = getPostDataFromPostFragment(postData || {})

	// STATE
	const [seeking, setSeeking] = useState(false)
	const [isError, setIsError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const [isInitShow, setIsInitShow] = useState(false)

	// EFFECT
	useEffect(() => {
		setIsInitShow(true)
	}, [])
	//
	useEffect(() => {
		setIsError(false)
		setIsLoading(true)
	}, [ncmazAudioUrl?.audioUrl])

	const handleSeekMouseUp = (
		e:
			| React.MouseEvent<HTMLInputElement, MouseEvent>
			| React.TouchEvent<HTMLInputElement>,
	) => {
		setSeeking(false)
		playerRef?.current?.seekTo(parseFloat(e.currentTarget.value))
	}

	const handleSeekMouseDown = () => {
		setSeeking(true)
	}

	const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPlayed(parseFloat(e.target.value))
	}

	const handleVolumeChange = (e: number) => {
		setVolume(e)
	}

	const handleSetPlaybackRate = (e: number) => {
		setplaybackRate(e)
	}

	const onClickBackwards10Sec = () => {
		playerRef?.current?.seekTo(playedSeconds - 10, 'seconds')
	}

	const onClickForwarkds15Sec = () => {
		playerRef?.current?.seekTo(playedSeconds + 15, 'seconds')
	}

	const handlePlay = () => {
		setPlaying(true)
	}
	const handlePause = () => {
		setPlaying(false)
	}

	const handleEnded = () => {
		setPlaying(false)
	}

	const handleProgress: ReactPlayerProps['onProgress'] = state => {
		// We only want to update time slider if we are not currently seeking
		if (!seeking) {
			setLoaded(state.loaded)
			setPlayed(state.played)
			setPlayedSeconds(state.playedSeconds)
			setLoadedSeconds(state.loadedSeconds)
		}
	}

	const handleDuration = (duration: number) => {
		setDuration(duration)
	}

	if (typeof window === 'undefined' || !isInitShow) {
		return null
	}

	return (
		<div className={`nc-MusicPlayer fixed inset-x-0 bottom-0 z-30 flex`}>
			{/* ---- PLAYER CONTROL ---- */}
			<DynamicPlayerContent
				isLoading={isLoading}
				isError={isError}
				handleSetMuted={isMuted => setMuted(isMuted)}
				handleSeekMouseUp={handleSeekMouseUp}
				handleSeekMouseDown={handleSeekMouseDown}
				handleSeekChange={handleSeekChange}
				handleVolumeChange={handleVolumeChange}
				handleSetPlaybackRate={handleSetPlaybackRate}
				handleClickBackwards10Sec={_.debounce(onClickBackwards10Sec, 200)}
				handleClickForwards15Sec={_.debounce(onClickForwarkds15Sec, 200)}
			/>

			{/* ---- PLAYER ---- */}
			<div className="invisible fixed left-0 top-0 -z-50 h-1 w-1 overflow-hidden opacity-0">
				<ReactPlayer
					ref={playerRef}
					className="react-player"
					width="100%"
					height="100%"
					url={ncmazAudioUrl?.audioUrl || ''}
					playing={playing}
					controls
					playbackRate={playbackRate}
					volume={volume}
					muted={muted}
					onReady={() => console.log('___onReady')}
					onStart={() => {
						console.log('___onStart')
						setIsLoading(false)
						setIsError(false)
					}}
					onPlay={handlePlay}
					onPause={handlePause}
					onBuffer={() => console.log('onBuffer')}
					onSeek={e => console.log('onSeek', e)}
					onEnded={handleEnded}
					onError={e => setIsError(true)}
					onProgress={handleProgress}
					onDuration={handleDuration}
				/>
			</div>
		</div>
	)
}

export default MusicPlayer
