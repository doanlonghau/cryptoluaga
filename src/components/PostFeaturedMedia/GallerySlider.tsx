'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { variants } from '@/utils/animationVariants'
import Link from 'next/link'
import { Route } from '@/data/types'
import MyImage from '../MyImage'

export interface GallerySliderProps {
	className?: string
	galleryImgs: string[]
	ratioClass?: string
	href?: Route
	imageClass?: string
	galleryClass?: string
	navigation?: boolean
}

export default function GallerySlider({
	className = 'relative z-10',
	galleryImgs,
	ratioClass = 'relative aspect-w-4 aspect-h-3',
	imageClass = '',
	galleryClass = 'rounded-xl',
	href,
	navigation = true,
}: GallerySliderProps) {
	const [loaded, setLoaded] = useState(false)
	const [index, setIndex] = useState(0)
	const [direction, setDirection] = useState(0)
	const images = galleryImgs

	function changePhotoId(newVal: number) {
		if (newVal > index) {
			setDirection(1)
		} else {
			setDirection(-1)
		}
		setIndex(newVal)
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (index < images?.length - 1) {
				changePhotoId(index + 1)
			}
		},
		onSwipedRight: () => {
			if (index > 0) {
				changePhotoId(index - 1)
			}
		},
		trackMouse: true,
	})

	let currentImage = images[index]

	return (
		<MotionConfig
			transition={{
				x: { type: 'spring', stiffness: 300, damping: 30 },
				opacity: { duration: 0.2 },
			}}
		>
			<div
				className={`group/cardGallerySlider group ${className}`}
				{...handlers}
			>
				{/* Main image */}
				<div className={`w-full overflow-hidden ${galleryClass}`}>
					<Link
						href={href || '/'}
						className={`flex items-center justify-center ${ratioClass}`}
					>
						<AnimatePresence initial={false} custom={direction}>
							<motion.div
								key={index}
								custom={direction}
								variants={variants(300, 1)}
								initial="enter"
								animate="center"
								exit="exit"
								className="absolute inset-0"
							>
								<MyImage
									src={currentImage || ''}
									fill
									alt="listing card gallery"
									className={`object-cover ${imageClass}`}
									onLoad={() => setLoaded(true)}
									sizes="(max-width: 1025px) 100vw, 300px"
								/>
							</motion.div>
						</AnimatePresence>
					</Link>
				</div>

				<>
					{/* Buttons */}
					{loaded && navigation && (
						<div className="opacity-0 transition-opacity group-hover/cardGallerySlider:opacity-100">
							{index > 0 && (
								<button
									className="absolute start-3 top-[calc(50%-16px)] z-10 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-500"
									style={{ transform: 'translate3d(0, 0, 0)' }}
									onClick={() => changePhotoId(index - 1)}
								>
									<ChevronLeftIcon className="h-4 w-4 rtl:rotate-180" />
								</button>
							)}
							{index + 1 < images.length && (
								<button
									className="absolute end-3 top-[calc(50%-16px)] z-10 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white hover:border-neutral-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:hover:border-neutral-500"
									style={{ transform: 'translate3d(0, 0, 0)' }}
									onClick={() => changePhotoId(index + 1)}
								>
									<ChevronRightIcon className="h-4 w-4 rtl:rotate-180" />
								</button>
							)}
						</div>
					)}

					{/* Bottom Nav bar */}
					<div className="absolute inset-x-0 bottom-0 h-10 rounded-b-lg bg-gradient-to-t from-neutral-900 opacity-50"></div>
					<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform items-center justify-center space-x-1.5 rtl:space-x-reverse">
						{images.map((_, i) => (
							<button
								className={`h-1.5 w-1.5 rounded-full ${
									i === index ? 'bg-white' : 'bg-white/60'
								}`}
								onClick={() => changePhotoId(i)}
								key={i}
							/>
						))}
					</div>
				</>
			</div>
		</MotionConfig>
	)
}
