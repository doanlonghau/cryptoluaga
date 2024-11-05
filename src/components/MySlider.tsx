import { ReactNode, useEffect, useRef, useState } from 'react'
import PrevBtn from '@/components/NextPrev/PrevBtn'
import NextBtn from '@/components/NextPrev/NextBtn'
import { useWindowSize } from '@/hooks/useWindowSize'
import useSnapSlider from '@/hooks/useSnapSlider'

export interface MySliderProps<T> {
	className?: string
	itemPerRow?: number
	data: T[]
	renderItem?: (item: T, indx: number) => ReactNode
	arrowBtnClass?: string
}

export default function MySlider<T>({
	className = '',
	itemPerRow = 5,
	data: dataProp = [],
	renderItem = () => <div></div>,
	arrowBtnClass = 'top-1/2 -translate-y-1/2',
}: MySliderProps<T>) {
	const data = dataProp.filter((item) => item)

	const [numberOfItems, setNumberOfitem] = useState(itemPerRow)
	const windowWidth = useWindowSize().width
	const sliderRef = useRef<HTMLDivElement>(null)

	const { scrollToNextSlide, scrollToPrevSlide, isAtEnd, isAtStart } =
		useSnapSlider({ sliderRef })

	useEffect(() => {
		if (itemPerRow <= 1) {
			return setNumberOfitem(1)
		}

		if (windowWidth <= 320) {
			return setNumberOfitem(1)
		}
		if (windowWidth < 500) {
			return setNumberOfitem(itemPerRow - 3 <= 1 ? 1.2 : itemPerRow - 3)
		}
		if (windowWidth < 1024) {
			return setNumberOfitem(itemPerRow - 2 <= 1 ? 1.2 : itemPerRow - 2)
		}
		if (windowWidth < 1280) {
			return setNumberOfitem(itemPerRow - 1 <= 1 ? 1.2 : itemPerRow - 1)
		}

		setNumberOfitem(itemPerRow)
	}, [itemPerRow, windowWidth])

	return (
		<div className={`nc-MySlider relative ${className}`}>
			<div
				className="hiddenScrollbar relative -mx-2 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden py-1 lg:-mx-4"
				ref={sliderRef}
			>
				{data.map((item, indx) => (
					<div
						className={`mySnapItem shrink-0 snap-start px-2 lg:px-4`}
						key={indx}
						style={{
							width: `calc(1/${numberOfItems} * 100%)`,
						}}
					>
						{renderItem(item, indx)}
					</div>
				))}
			</div>

			{!isAtStart && (
				<PrevBtn
					onClick={scrollToPrevSlide}
					className={`absolute -start-3 z-10 h-9 w-9 text-lg xl:-start-6 xl:h-12 xl:w-12 ${arrowBtnClass}`}
				/>
			)}

			{!isAtEnd && (
				<NextBtn
					onClick={scrollToNextSlide}
					className={`absolute -end-3 z-10 h-9 w-9 text-lg xl:-end-6 xl:h-12 xl:w-12 ${arrowBtnClass}`}
				/>
			)}
		</div>
	)
}
