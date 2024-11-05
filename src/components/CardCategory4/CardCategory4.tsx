import { FC } from 'react'
import { TwMainColor } from '@/data/types'
import Badge from '@/components/Badge/Badge'
import Link from 'next/link'
import { CommonTermCardProps } from '../CardCategory1/CardCategory1'
import MyImage from '../MyImage'
import { getCatgoryDataFromCategoryFragment } from '@/utils/getCatgoryDataFromCategoryFragment'
import { getColorClass2 } from '@/utils/getColorClass'

export interface CardCategory4Props extends CommonTermCardProps {
	index?: string
}

const CardCategory4: FC<CardCategory4Props> = ({
	className = '',
	term,
	index,
}) => {
	const { count, databaseId, name, uri, featuredImageMeta, colorMeta } =
		getCatgoryDataFromCategoryFragment(term)

	return (
		<Link href={uri} className={`nc-CardCategory4 flex flex-col ${className}`}>
			<div className="group aspect-h-5 aspect-w-7 relative h-0 w-full flex-shrink-0 overflow-hidden rounded-3xl ring-2 ring-white dark:ring-black">
				<MyImage
					alt={name}
					fill
					src={featuredImageMeta?.sourceUrl || ''}
					className="h-full w-full rounded-2xl object-cover"
					sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
				/>
				<div>
					{index && (
						<Badge
							color={(colorMeta?.[0] as TwMainColor) || undefined}
							name={index}
							className="absolute start-3 top-3"
						/>
					)}
				</div>
				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100"></span>
			</div>

			<div className="mt-3 flex items-center sm:mt-5">
				<div
					className={`h-8 w-8 flex-shrink-0 sm:h-9 sm:w-9 ${getColorClass2(
						colorMeta?.[0] as TwMainColor,
					)} rounded-full`}
				></div>
				<div className="ms-2 sm:ms-4">
					<h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
						<span className="line-clamp-1">{name}</span>
					</h2>
					<span className="block text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
						{count} Articles
					</span>
				</div>
			</div>
		</Link>
	)
}

export default CardCategory4
