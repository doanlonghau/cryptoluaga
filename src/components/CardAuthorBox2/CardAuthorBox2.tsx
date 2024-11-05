import { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Avatar from '@/components/Avatar/Avatar'
import NcImage from '@/components/NcImage/NcImage'
import Link from 'next/link'
import { NC_USER_FULL_FIELDS_FRAGMENT } from '@/fragments'
import { FragmentType } from '@/__generated__'
import { getUserDataFromUserCardFragment } from '@/utils/getUserDataFromUserCardFragment'

export interface CardAuthorBox2Props {
	className?: string
	author: FragmentType<typeof NC_USER_FULL_FIELDS_FRAGMENT>
}

const CardAuthorBox2: FC<CardAuthorBox2Props> = ({
	className = '',
	author,
}) => {
	const { databaseId, featuredImageMeta, name, uri, ncUserMeta, bgImageMeta } =
		getUserDataFromUserCardFragment(author)
	return (
		<Link
			href={uri}
			className={`nc-CardAuthorBox2 flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-neutral-800 ${className}`}
		>
			<div className="relative flex-shrink-0">
				<div>
					<NcImage
						alt={bgImageMeta?.altText || ''}
						containerClassName="flex aspect-w-7 aspect-h-5 w-full h-0"
						src={bgImageMeta?.sourceUrl || ''}
						fill
						sizes="(max-width: 600px) 480px, 33vw"
					/>
				</div>
				<div className="absolute inset-x-3 top-3 flex">
					<div className="flex items-center justify-center rounded-full bg-neutral-100 px-4 py-1 text-xs font-medium leading-none dark:bg-neutral-800">
						<ArrowRightIcon className="h-5 w-5 text-yellow-600 rtl:rotate-180" />
					</div>
				</div>
			</div>

			<div className="m-8 -mt-8 text-center">
				<Avatar
					containerClassName="ring-2 ring-white"
					sizeClass="w-16 h-16 text-2xl"
					radius="rounded-full"
					imgUrl={featuredImageMeta?.sourceUrl || ''}
					userName={name}
				/>
				<div className="mt-3">
					<h2 className={`text-base font-medium`}>
						<span className="line-clamp-1">{name}</span>
					</h2>
					<span
						className={`mt-1 block text-sm text-neutral-500 dark:text-neutral-400`}
					>
						{ncUserMeta?.ncBio}
					</span>
				</div>
			</div>
		</Link>
	)
}

export default CardAuthorBox2
