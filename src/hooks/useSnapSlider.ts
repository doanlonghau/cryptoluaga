import { useEffect, useState } from 'react'
import _ from 'lodash'

export default function useSnapSlider({
	sliderRef,
}: {
	sliderRef: React.RefObject<HTMLDivElement>
}) {
	const [isAtEnd, setIsAtEnd] = useState(false)
	const [isAtStart, setIsAtStart] = useState(true)

	const get_slider_item_size = () =>
		sliderRef.current?.querySelector('.mySnapItem')?.clientWidth || 0

	useEffect(() => {
		const slider = sliderRef.current
		if (!slider) return

		const handleScroll = _.debounce(() => {
			const slider = sliderRef.current
			if (!slider) return

			setIsAtEnd(
				slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 50,
			)
			setIsAtStart(slider.scrollLeft < 50)
		}, 600)

		slider.addEventListener('scroll', handleScroll)
		return () => {
			slider.removeEventListener('scroll', handleScroll)
		}
	}, [sliderRef.current])

	function scrollToNextSlide() {
		sliderRef.current?.scrollBy({
			left: get_slider_item_size(),
			behavior: 'smooth',
		})
	}

	function scrollToPrevSlide() {
		sliderRef.current?.scrollBy({
			left: -get_slider_item_size(),
			behavior: 'smooth',
		})
	}

	return {
		scrollToNextSlide,
		scrollToPrevSlide,
		isAtEnd,
		isAtStart,
	}
}
