import { FC, useState } from 'react'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import NcModal from '@/components/NcModal/NcModal'
import { PlayIcon } from '@heroicons/react/24/solid'
import Button from '../Button/Button'
import MyImage from '../MyImage'

export interface SectionHero2Props {}
const SectionHero2: FC<SectionHero2Props> = ({}) => {
	const [showVideo, setShowVideo] = useState(false)

	const renderOpenModalVideo = () => {
		return (
			<Button pattern="white" onClick={() => setShowVideo(!showVideo)}>
				Play video
				<PlayIcon className="ms-2 h-5 w-5 rtl:rotate-180" />
			</Button>
		)
	}

	const renderVideoModalContent = () => {
		return (
			<div className="aspect-h-9 aspect-w-16">
				<iframe
					src={`https://www.youtube.com/embed/qTsXfGVjm1w?autoplay=1`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					title="ncblog hero video"
				></iframe>
			</div>
		)
	}

	return (
		<div className="SectionHero2 relative bg-black pb-20 md:py-32 lg:py-60">
			<div className="mb-10 flex w-full md:absolute md:bottom-0 md:end-0 md:top-0 md:mb-0 md:w-1/2 xl:w-3/5">
				<div className="absolute bottom-0 start-0 top-0 z-[1] hidden w-44 bg-gradient-to-r from-black md:block rtl:bg-gradient-to-l"></div>
				<MyImage
					fill
					className="object-cover"
					src="https://images.pexels.com/photos/4666750/pexels-photo-4666750.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
					sizes="1260px"
					alt="hero"
				/>
			</div>
			<div className="container relative z-10 text-neutral-100">
				<div className="max-w-3xl">
					<h1 className="mt-3 text-4xl font-bold md:text-5xl md:!leading-[110%] xl:text-6xl">
						The hidden world of whale culture
					</h1>
					<p className="mt-7 text-base text-neutral-300 lg:text-xl">
						From singing competitions to food preferences, scientists are
						learning whales have cultural differences once thought to be unique
						to humans.
					</p>
					<div className="mt-11 flex space-x-4 rtl:space-x-reverse">
						<ButtonPrimary href="/">Read more</ButtonPrimary>

						<NcModal
							isOpenProp={showVideo}
							onCloseModal={() => setShowVideo(false)}
							contentExtraClass="max-w-screen-lg 2xl:max-w-screen-xl"
							contentPaddingClass=""
							renderContent={renderVideoModalContent}
							renderTrigger={renderOpenModalVideo}
							modalTitle=""
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SectionHero2
