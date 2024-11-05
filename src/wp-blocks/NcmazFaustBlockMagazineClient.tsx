import { useLazyQuery } from '@apollo/client'
import { NcmazFaustBlockMagazineFragmentFragment } from '../__generated__/graphql'
import { WordPressBlock } from '@faustwp/blocks'
import Empty from '@/components/Empty'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import { QUERY_GET_POSTS_BY } from '@/fragments/queries'
import updatePostFromUpdateQuery from '@/utils/updatePostFromUpdateQuery'
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import { TPostCard } from '@/components/Card2/Card2'
import SectionHero3 from '@/components/Sections/SectionHero3'
import dynamic from 'next/dynamic'
import useGetPostsNcmazMetaByIds from '@/hooks/useGetPostsNcmazMetaByIds'
import SectionMagazine5 from '../components/Sections/SectionMagazine5'
import SectionMagazine8 from '../components/Sections/SectionMagazine8'
import SectionMagazine2 from '../components/Sections/SectionMagazine2'
import SectionMagazine6 from '../components/Sections/SectionMagazine6'
import errorHandling from '@/utils/errorHandling'
import { useEffect, useState } from 'react'
import getTrans from '@/utils/getTrans'
import { LinkProps } from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Button from '@/components/Button/Button'

const DynamicSectionMagazine1 = dynamic(
	() => import('../components/Sections/SectionMagazine1'),
)
const DynamicSectionMagazine3 = dynamic(
	() => import('../components/Sections/SectionMagazine3'),
)
const DynamicSectionMagazine4 = dynamic(
	() => import('../components/Sections/SectionMagazine4'),
)
const DynamicSectionMagazine7 = dynamic(
	() => import('../components/Sections/SectionMagazine7'),
)
// const DynamicSectionMagazine8 = dynamic(
// 	() => import('../components/Sections/SectionMagazine8'),
// )
const DynamicSectionMagazine9 = dynamic(
	() => import('../components/Sections/SectionMagazine9'),
)
const DynamicSectionMagazine10 = dynamic(
	() => import('../components/Sections/SectionMagazine10'),
)
const DynamicSectionMagazine11 = dynamic(
	() => import('../components/Sections/SectionMagazine11'),
)
const DynamicSectionGridPosts = dynamic(
	() => import('../components/Sections/SectionGridPosts'),
)
const DynamicSectionSliderPosts = dynamic(
	() => import('../components/Sections/SectionSliderPosts'),
)
const DynamicSectionLargeSlider = dynamic(
	() => import('../components/Sections/SectionLargeSlider'),
)
//

const NcmazFaustBlockMagazineClient: WordPressBlock<
	NcmazFaustBlockMagazineFragmentFragment & {
		renderedHtml?: string
		clientId?: string
		parentClientId?: string
		dataObject?: {
			block_posts?: TPostCard[]
			errors?: any[]
			queryVariables?: Record<string, any>
			pageInfo?: {
				endCursor: string
				hasNextPage: boolean
			}
		} | null
	}
> = ({ attributes, clientId, parentClientId, renderedHtml, dataObject }) => {
	const { blockVariation, hasBackground, showViewAll } = attributes || {}

	const [queryGetPostByVariablesFromSSR, getPostByVariablesFromSSRResult] =
		useLazyQuery(QUERY_GET_POSTS_BY, {
			notifyOnNetworkStatusChange: true,
			context: {
				fetchOptions: {
					method: process.env.NEXT_PUBLIC_SITE_API_METHOD || 'GET',
				},
			},
			onError: (error) => {
				errorHandling(error)
			},
		})

	const T = getTrans()

	const [dataInitPosts_state, setDataInitPosts_state] = useState<
		TPostCard[] | null
	>()
	const [dataInitErrors_state, setDataInitErrors_state] = useState<
		any[] | null
	>()
	const [dataInitQueryVariable_state, setDataInitQueryVariable_state] =
		useState<any | null>()
	const [dataInitPageInfo_state, setDataInitPageInfo_state] = useState<{
		endCursor: string
		hasNextPage: boolean
	} | null>()

	//
	const dataInitPosts = dataObject?.block_posts || dataInitPosts_state
	const dataInitErrors = dataObject?.errors || dataInitErrors_state
	const dataInitQueryVariable =
		dataObject?.queryVariables || dataInitQueryVariable_state
	const dataInitPageInfo = dataObject?.pageInfo || dataInitPageInfo_state

	//

	useEffect(() => {
		if (typeof window === 'undefined' || dataObject !== null) {
			return
		}
		// Deprecated, will be removed in future official versions!!!
		// Deprecated, will be removed in future official versions!!!
		const renderedHtmlNode = document.createElement('div')
		renderedHtmlNode.innerHTML = renderedHtml || ''
		const contentNode = renderedHtmlNode.querySelector(
			'.ncmazfc-block-content-common-class',
		)

		const dataInitPosts: TPostCard[] = JSON.parse(
			contentNode?.getAttribute('data-ncmazfc-init-posts') || 'null',
		)
		const dataInitErrors = JSON.parse(
			contentNode?.getAttribute('data-ncmazfc-init-errors') || 'null',
		)
		const dataInitQueryVariable = JSON.parse(
			contentNode?.getAttribute('data-ncmazfc-init-query-variables') || 'null',
		)
		const dataInitPageInfo: {
			endCursor: string
			hasNextPage: boolean
		} | null = JSON.parse(
			contentNode?.getAttribute('data-ncmazfc-init-data-page-info') || 'null',
		)

		setDataInitPosts_state(dataInitPosts)
		setDataInitErrors_state(dataInitErrors)
		setDataInitQueryVariable_state(dataInitQueryVariable)
		setDataInitPageInfo_state(dataInitPageInfo)
	}, [])

	//
	useGetPostsNcmazMetaByIds({
		posts: dataInitPosts || [],
	})
	//

	const handleClickLoadmore = () => {
		if (dataInitPageInfo?.hasNextPage !== true) {
			return
		}

		if (!getPostByVariablesFromSSRResult.called) {
			queryGetPostByVariablesFromSSR({
				variables: {
					...(dataInitQueryVariable || {}),
					after: dataInitPageInfo?.endCursor,
				},
			})
			return
		}

		getPostByVariablesFromSSRResult.fetchMore({
			variables: {
				...(dataInitQueryVariable || {}),
				after: getPostByVariablesFromSSRResult.data?.posts?.pageInfo?.endCursor,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				return updatePostFromUpdateQuery(prev, fetchMoreResult)
			},
		})
	}

	let dataLists = [
		...(dataInitPosts || []),
		...(getPostByVariablesFromSSRResult.data?.posts?.nodes || []),
	] as TPostCard[]

	const showLoadmoreButton = !getPostByVariablesFromSSRResult.data?.posts
		? dataInitPageInfo?.hasNextPage === true
		: getPostByVariablesFromSSRResult.data?.posts?.pageInfo?.hasNextPage ===
			true

	const viewAllLinkHref: LinkProps['href'] | undefined = showViewAll
		? {
				pathname: '/posts',
				query: { ...(dataInitQueryVariable || {}), first: 12 },
			}
		: undefined

	return (
		<>
			{hasBackground ? <BackgroundSection /> : null}
			<MagazineLayoutType
				posts={dataLists || []}
				blockVariation={blockVariation}
				error={dataInitErrors || getPostByVariablesFromSSRResult.error}
				viewAllLinkHref={viewAllLinkHref}
			/>

			{/* FOR Magzine or grid */}
			{!(blockVariation || '').startsWith('slider-') &&
			(showLoadmoreButton || showViewAll) ? (
				<div className="mt-12 flex items-center justify-center gap-4 sm:mt-16 2xl:mt-20">
					{showLoadmoreButton ? (
						<ButtonPrimary
							loading={getPostByVariablesFromSSRResult.loading}
							onClick={handleClickLoadmore}
						>
							{T['Show me more']}
						</ButtonPrimary>
					) : null}

					{showViewAll ? (
						<Button
							href={viewAllLinkHref}
							pattern={showLoadmoreButton ? 'third' : 'primary'}
						>
							{T['View all']}
							<ArrowRightIcon className="ms-2 h-5 w-5 rtl:rotate-180" />
						</Button>
					) : null}
				</div>
			) : null}
		</>
	)
}

export function MagazineLayoutType({
	posts,
	blockVariation,
	error,
	viewAllLinkHref,
}: {
	posts: TPostCard[]
	blockVariation?: string | null
	error: any
	viewAllLinkHref?: LinkProps['href']
}) {
	if (error) {
		console.error('_____ LayoutType error', { blockVariation, posts, error })
	}

	if (!posts || !posts?.length) {
		return <Empty />
	}

	const showViewAll = !!viewAllLinkHref

	switch (blockVariation) {
		case 'magazine-1':
			return <DynamicSectionMagazine1 posts={posts} />
		case 'magazine-2':
			return <SectionMagazine2 posts={posts} />
		case 'magazine-3':
			return <DynamicSectionMagazine3 posts={posts} />
		case 'magazine-4':
			return <DynamicSectionMagazine4 posts={posts} />
		case 'magazine-5':
			return <SectionMagazine5 posts={posts} />
		case 'magazine-6':
			return <SectionMagazine6 posts={posts} />
		case 'magazine-7':
			return <DynamicSectionMagazine7 posts={posts} />
		case 'magazine-8':
			return <SectionMagazine8 posts={posts} />
		case 'magazine-9':
			return <DynamicSectionMagazine9 posts={posts} />
		case 'magazine-10':
			return <DynamicSectionMagazine10 posts={posts} />
		case 'magazine-11':
			return <DynamicSectionMagazine11 posts={posts} />
		case 'magazine-12':
			return <DynamicSectionLargeSlider posts={posts} />
		case 'magazine-13':
			return <SectionHero3 posts={posts} />

		// Grids
		case 'grid-1':
			return (
				<DynamicSectionGridPosts
					gridClass="lg:grid-cols-2 md:gap-8 lg:gap-10"
					posts={posts}
					postCardName="card3"
				/>
			)
		case 'grid-2':
			return <DynamicSectionGridPosts posts={posts} postCardName="card4" />
		case 'grid-3':
			return <DynamicSectionGridPosts posts={posts} postCardName="card7" />
		case 'grid-4':
			return <DynamicSectionGridPosts posts={posts} postCardName="card9" />
		case 'grid-5':
			return <DynamicSectionGridPosts posts={posts} postCardName="card10" />
		case 'grid-6':
			return (
				<DynamicSectionGridPosts
					gridClass="md:grid-cols-2 lg:grid-cols-3"
					posts={posts}
					postCardName="card10V2"
				/>
			)
		case 'grid-7':
			return <DynamicSectionGridPosts posts={posts} postCardName="card11" />
		case 'grid-8':
			return (
				<DynamicSectionGridPosts
					gridClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:!gap-6"
					posts={posts}
					postCardName="card14"
				/>
			)
		case 'grid-9':
			return (
				<DynamicSectionGridPosts
					gridClass="md:grid-cols-2 xl:grid-cols-3 !gap-6"
					posts={posts}
					postCardName="card15Podcast"
				/>
			)

		// Slider
		case 'slider-1':
			return (
				<DynamicSectionSliderPosts
					posts={posts}
					postCardName="card4"
					showViewAll={showViewAll}
					viewAllLinkHref={viewAllLinkHref}
				/>
			)
		case 'slider-2':
			return (
				<DynamicSectionSliderPosts
					posts={posts}
					postCardName="card7"
					showViewAll={showViewAll}
					viewAllLinkHref={viewAllLinkHref}
				/>
			)
		case 'slider-3':
			return (
				<DynamicSectionSliderPosts
					posts={posts}
					postCardName="card9"
					showViewAll={showViewAll}
					viewAllLinkHref={viewAllLinkHref}
				/>
			)
		case 'slider-4':
			return (
				<DynamicSectionSliderPosts
					posts={posts}
					postCardName="card10"
					showViewAll={showViewAll}
					viewAllLinkHref={viewAllLinkHref}
				/>
			)
		case 'slider-5':
			return (
				<DynamicSectionSliderPosts
					perView={3}
					posts={posts}
					postCardName="card10V2"
					showViewAll={showViewAll}
					viewAllLinkHref={viewAllLinkHref}
				/>
			)
		case 'slider-6':
			return (
				<DynamicSectionSliderPosts
					posts={posts}
					postCardName="card11"
					showViewAll={showViewAll}
					viewAllLinkHref={viewAllLinkHref}
				/>
			)

		default:
			return <DynamicSectionMagazine9 posts={posts} />
	}
}

export default NcmazFaustBlockMagazineClient
