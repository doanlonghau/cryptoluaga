import { TPostCard } from '@/components/Card2/Card2'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import { MagazineLayoutType } from '@/wp-blocks/NcmazFaustBlockMagazineClient'
import { TermBlockLayoutType } from '@/wp-blocks/NcmazFaustBlockTerms'
import { useEffect, useRef, useState } from 'react'

const backendUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || ''

const Page = () => {
	const [data, setData] = useState<{
		data?: TPostCard[] | TCategoryCardFull[] | null
		blockVariation?: string | null
		error: any
		clientId: string
	}>({ data: [], error: null, clientId: '' })
	const [height, setHeight] = useState<number>()
	const ref = useRef<HTMLDivElement>(null)
	const [messageType, setMessageType] = useState<
		'ncmazfc-preview-posts-block' | 'ncmazfc-preview-terms-block'
	>()

	useEffect(() => {
		if (typeof window === 'undefined') {
			return
		}

		const body = document.querySelector('body')
		if (body) {
			body.style.backgroundColor = 'transparent'
			body.style.overflow = 'hidden'
		}
	}, [])

	useEffect(() => {
		if (typeof window === 'undefined') {
			return
		}

		window.addEventListener('message', function (event) {
			if (
				!event.origin.includes(backendUrl) &&
				!backendUrl.includes(event.origin)
			) {
				return
			}
			if (
				!event.data ||
				(event.data.type !== 'ncmazfc-preview-posts-block' &&
					event.data.type !== 'ncmazfc-preview-terms-block')
			) {
				return
			}
			setMessageType(event.data.type)
			setData(event.data)
		})
	}, [])

	useEffect(() => {
		// pass the message to the parent
		setTimeout(() => {
			window.parent.postMessage(
				{
					type: 'ncmaz-preview-iframe-height',
					height,
					clientId: data?.clientId,
				},
				backendUrl,
			)
		}, 200)
	}, [height, data?.clientId])

	useEffect(() => {
		// Chọn div mà bạn muốn theo dõi
		const targetNode = ref.current

		if (!targetNode) {
			return
		}

		const observer = new MutationObserver((mutationsList, observer) => {
			for (let mutation of mutationsList) {
				if (mutation.type === 'childList') {
					setTimeout(() => {
						const h = targetNode?.getBoundingClientRect().height
						setHeight(h)
					}, 100)
				}
			}
		})
		// Đặt các cài đặt cho MutationObserver
		const config = { childList: true }
		// Bắt đầu theo dõi
		observer.observe(targetNode, config)
		return () => {
			observer.disconnect()
		}
	}, [ref])

	console.log('data', data)

	return (
		<div ref={ref} className="no-prose relative">
			<>
				{!!data?.data?.length &&
					messageType === 'ncmazfc-preview-posts-block' && (
						<MagazineLayoutType
							posts={data.data as TPostCard[]}
							error={data.error}
							blockVariation={data.blockVariation}
						/>
					)}

				{!!data?.data?.length &&
					messageType === 'ncmazfc-preview-terms-block' && (
						<TermBlockLayoutType
							blockVariation={data.blockVariation}
							dataInitErrors={data.error}
							dataInitTerms={data.data as TCategoryCardFull[]}
						/>
					)}
			</>

			<div className="absolute inset-0 z-[1] bg-transparent" />
		</div>
	)
}

export default Page
