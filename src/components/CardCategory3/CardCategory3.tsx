import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CommonTermCardProps } from '../CardCategory1/CardCategory1'
import MyImage from '../MyImage'
import { getCatgoryDataFromCategoryFragment } from '@/utils/getCatgoryDataFromCategoryFragment'

export interface CardCategory3Props extends CommonTermCardProps {}

const CardCategory3: FC<CardCategory3Props> = ({ className = '', term }) => {
	const { count, databaseId, name, uri, featuredImageMeta, colorMeta } =
		getCatgoryDataFromCategoryFragment(term)
	return (
		<Link href={uri} className={`nc-CardCategory3 flex flex-col ${className}`}>
			<div className="group aspect-h-5 aspect-w-5 relative h-0 w-full flex-shrink-0 overflow-hidden rounded-2xl">
				<MyImage
					src={featuredImageMeta?.sourceUrl || ''}
					className="h-full w-full rounded-2xl object-cover"
					sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
					fill
					alt={name}
				/>
				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
			</div>
			<div className="mt-4">
				<h2
					className={`text-base font-semibold text-neutral-900 dark:text-neutral-100`}
				>
					{name}
				</h2>
				<span
					className={`mt-1 block text-sm text-neutral-600 dark:text-neutral-400`}
				>
					{count} Articles
				</span>
			</div>
		</Link>
	)
}

export default CardCategory3
