import { FC } from 'react'
import { TwMainColor } from '@/data/types'
import Badge from '@/components/Badge/Badge'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { CommonTermCardProps } from '../CardCategory1/CardCategory1'
import MyImage from '../MyImage'
import { getCatgoryDataFromCategoryFragment } from '@/utils/getCatgoryDataFromCategoryFragment'

export interface CardCategory5Props extends CommonTermCardProps {}

const CardCategory5: FC<CardCategory5Props> = ({ className = '', term }) => {
	const { count, databaseId, name, uri, featuredImageMeta, colorMeta } =
		getCatgoryDataFromCategoryFragment(term)

	return (
		<Link
			href={uri}
			className={`nc-CardCategory5 group relative block ${className}`}
		>
			<div
				className={`group aspect-h-5 aspect-w-8 relative z-0 h-0 w-full flex-shrink-0 overflow-hidden rounded-3xl`}
			>
				<MyImage
					fill
					alt={name}
					src={featuredImageMeta?.sourceUrl || ''}
					className="h-full w-full rounded-2xl object-cover"
					sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
				/>
				<span className="absolute inset-0 bg-black bg-opacity-20 transition-colors group-hover:bg-opacity-30"></span>
			</div>
			<Badge
				className="absolute end-3 top-3"
				color={colorMeta?.[0] as TwMainColor}
				name={
					<div className="flex items-center">
						{count}
						<ArrowRightIcon className="ms-1.5 h-3.5 w-3.5 rtl:rotate-180" />
					</div>
				}
			/>
			<div className="absolute inset-0 flex items-center justify-center">
				<h2
					className={`rounded-full border-2 border-white border-opacity-60 bg-white bg-opacity-50 px-4 py-2 text-base font-medium text-neutral-900 backdrop-blur-lg backdrop-filter sm:px-6 sm:py-3`}
				>
					{name}
				</h2>
			</div>
		</Link>
	)
}

export default CardCategory5
