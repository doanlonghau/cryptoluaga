import { FC } from 'react'
import { PostDataFragmentType } from '@/data/types'
import ButtonPlayMusicPlayer from '@/components/ButtonPlayMusicPlayer'

export interface MediaAudioProps {
	post: PostDataFragmentType
}

const MediaAudio: FC<MediaAudioProps> = ({ post }) => {
	return (
		<>
			<ButtonPlayMusicPlayer
				className="absolute inset-0 flex items-center justify-center bg-neutral-900/30"
				post={post}
			/>
		</>
	)
}

export default MediaAudio
