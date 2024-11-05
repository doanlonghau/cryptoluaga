import { FC } from 'react'
import Card4 from '@/components/Card4/Card4'
import Card7 from '@/components/Card7/Card7'
import Card9 from '@/components/Card9/Card9'
import Card10 from '@/components/Card10/Card10'
import Card11 from '@/components/Card11/Card11'
import Card10V2 from '@/components/Card10/Card10V2'
import MySlider from '@/components/MySlider'
import { SectionMagazine1Props } from './SectionMagazine1'
import getTrans from '@/utils/getTrans'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link, { LinkProps } from 'next/link'

const T = getTrans()

export interface SectionSliderPostsProps extends SectionMagazine1Props {
	postCardName?: 'card4' | 'card7' | 'card9' | 'card10' | 'card10V2' | 'card11'
	perView?: 2 | 3 | 4
	showViewAll?: boolean
	viewAllLinkHref?: LinkProps['href']
}

const SectionSliderPosts: FC<SectionSliderPostsProps> = ({
	className = '',
	posts,
	postCardName = 'card4',
	perView = 4,
	showViewAll,
	viewAllLinkHref,
}) => {
	let CardComponent = Card4

	switch (postCardName) {
		case 'card4':
			CardComponent = Card4
			break
		case 'card7':
			CardComponent = Card7
			break
		case 'card9':
			CardComponent = Card9
			break
		case 'card10':
			CardComponent = Card10
			break
		case 'card10V2':
			CardComponent = Card10V2
			break
		case 'card11':
			CardComponent = Card11
			break

		default:
			break
	}

	const postsFiltered = posts.filter((item) => item)

	const renderViewAllBtn = () => {
		if (!viewAllLinkHref) return null

		if (postCardName === 'card10V2') {
			return (
				<div className="nc-Card10V2_viewAll relative flex h-full flex-col">
					<div className="aspect-h-12 aspect-w-16 relative w-full flex-shrink-0 sm:aspect-h-9">
						<Link
							href={viewAllLinkHref}
							className="absolute inset-0 flex h-full w-full items-center justify-center rounded-3xl border-2 border-neutral-200 p-2 text-base font-medium underline transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
						>
							{T['View all']}
							<ArrowRightIcon className="ms-2.5 h-5 w-5 rtl:rotate-180" />
						</Link>
					</div>
				</div>
			)
		}

		if (postCardName === 'card10') {
			return (
				<div className="nc-Card10_viewAll relative flex h-full flex-col">
					<div className="aspect-h-7 aspect-w-9 relative w-full flex-shrink-0 sm:aspect-h-9">
						<Link
							href={viewAllLinkHref}
							className="absolute inset-0 flex h-full w-full items-center justify-center rounded-3xl border-2 border-neutral-200 p-2 text-base font-medium underline transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
						>
							{T['View all']}
							<ArrowRightIcon className="ms-2.5 h-5 w-5 rtl:rotate-180" />
						</Link>
					</div>
				</div>
			)
		}

		return (
			<Link
				href={viewAllLinkHref}
				className="relative flex h-full w-full items-center justify-center rounded-3xl border-2 border-neutral-200 p-2 text-base font-medium underline transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
			>
				{T['View all']}
				<ArrowRightIcon className="ms-2.5 h-5 w-5 rtl:rotate-180" />
			</Link>
		)
	}

	return (
		<div className={`nc-SectionSliderPosts ${className}`}>
			<MySlider
				data={showViewAll ? [...postsFiltered, 'viewAll'] : postsFiltered}
				renderItem={(item) => {
					if (typeof item === 'string') {
						return renderViewAllBtn()
					}
					return <CardComponent key={item.databaseId} post={item} />
				}}
				itemPerRow={perView}
			/>
		</div>
	)
}

export default SectionSliderPosts
