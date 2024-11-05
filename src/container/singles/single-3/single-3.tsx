import React, { FC } from 'react'
import { SingleType1Props } from '../single/single'
import SingleHeader from '../SingleHeader'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import MyImage from '@/components/MyImage'

interface Props extends SingleType1Props {}

const SingleType3: FC<Props> = ({ post }) => {
	//
	const { title, content, date, author, databaseId, excerpt, featuredImage } =
		getPostDataFromPostFragment(post || {})
	//

	const imgWidth = featuredImage?.mediaDetails?.width || 1000
	const imgHeight = featuredImage?.mediaDetails?.height || 750

	return (
		<header className="relative z-10 bg-neutral-900 pt-16 lg:py-28 dark:bg-black">
			{/* SINGLE HEADER */}
			<div className="dark container relative z-10">
				<div
					className={`max-w-full lg:max-w-screen-sm lg:pr-5 xl:max-w-screen-md ${
						featuredImage?.sourceUrl ? '' : 'mx-auto pb-6 lg:pb-0'
					}`}
				>
					<SingleHeader post={post} hiddenDesc />
				</div>
			</div>

			{/* FEATURED IMAGE */}
			{featuredImage?.sourceUrl && (
				<div className="mt-8 lg:absolute lg:bottom-0 lg:end-0 lg:top-0 lg:mt-0 lg:w-[37%] 2xl:w-1/3">
					<MyImage
						className="mx-auto block object-cover lg:absolute lg:inset-0 lg:h-full lg:w-full"
						src={featuredImage?.sourceUrl || ''}
						alt={title}
						priority
						sizes="(max-width: 1024px) 100vw, 50vw"
						enableDefaultPlaceholder
						width={imgWidth}
						height={imgHeight}
					/>

					<div className="absolute bottom-0 start-0 top-0 hidden w-1/5 bg-gradient-to-r from-neutral-900 md:block rtl:bg-gradient-to-l dark:from-black"></div>
				</div>
			)}
		</header>
	)
}

export default SingleType3
