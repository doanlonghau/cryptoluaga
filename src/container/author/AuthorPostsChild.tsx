import { FaustPage } from '@faustwp/core'
import { useFragment } from '@/__generated__'
import {
	GetAuthorWithPostsQuery,
	NcgeneralSettingsFieldsFragmentFragment,
} from '@/__generated__/graphql'
import React from 'react'
import ArchiveFilterListBox from '@/components/ArchiveFilterListBox/ArchiveFilterListBox'
import SectionSubscribe2 from '@/components/SectionSubscribe2/SectionSubscribe2'
import SectionTrendingTopic from '@/components/SectionTrendingTopic'
import { FILTERS_OPTIONS } from '@/contains/contants'
import useHandleGetPostsArchivePage from '@/hooks/useHandleGetPostsArchivePage'
import { NC_USER_FULL_FIELDS_FRAGMENT } from '@/fragments'
import PageLayout from '@/container/PageLayout'
import { getImageDataFromImageFragment } from '@/utils/getImageDataFromImageFragment'
import { PostDataFragmentType } from '@/data/types'
import GridPostsArchive from '@/components/GridPostsArchive'
import useGetPostsNcmazMetaByIds from '@/hooks/useGetPostsNcmazMetaByIds'
import { TPostCard } from '@/components/Card2/Card2'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import AuthorLayout from '@/container/AuthorPageLayout'
import Tab from '@/container/AuthorPageTab'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'

const FILTERS = FILTERS_OPTIONS

const AuthorPostsChild: FaustPage<GetAuthorWithPostsQuery> = props => {
	const { user } = props.data || {}

	const posts = user?.posts
	const { databaseId, id, name, ncUserMeta } = useFragment(
		NC_USER_FULL_FIELDS_FRAGMENT,
		user || {},
	)
	const _top10Categories =
		(props.data?.categories?.nodes as TCategoryCardFull[]) || []

	//
	const {} = useGetPostsNcmazMetaByIds({
		posts: (posts?.nodes || []) as TPostCard[],
	})
	//

	const {
		currentPosts,
		handleChangeFilterPosts,
		handleClickShowMore,
		hasNextPage,
		loading,
	} = useHandleGetPostsArchivePage({
		initPosts: (posts?.nodes as PostDataFragmentType[]) || [],
		initPostsPageInfo: posts?.pageInfo || null,
		authorDatabaseId: databaseId,
	})

	return (
		<>
			<PageLayout
				headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
				footerMenuItems={props.data?.footerMenuItems?.nodes || []}
				pageFeaturedImageUrl={
					getImageDataFromImageFragment(ncUserMeta?.featuredImage?.node)
						?.sourceUrl || null
				}
				pageTitle={name}
				generalSettings={
					props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
				}
			>
				<AuthorLayout user={user || {}}>
					<div className="container space-y-16 py-16 lg:space-y-28 lg:pb-28 lg:pt-20">
						<main>
							{/* TABS FILTER */}
							<div className="flex flex-col border-neutral-200 sm:flex-row sm:items-center sm:justify-between sm:border-b dark:border-neutral-600">
								<Tab currentTab="" />

								<div className="mb-4 block w-full border-b border-neutral-300 sm:hidden dark:border-neutral-500"></div>
								<div className="flex justify-end">
									<ArchiveFilterListBox
										lists={FILTERS}
										onChange={handleChangeFilterPosts}
									/>
								</div>
							</div>

							<GridPostsArchive
								posts={currentPosts}
								loading={loading}
								showLoadmore={hasNextPage}
								onClickLoadmore={handleClickShowMore}
							/>
						</main>

						{/* === SECTION 5 === */}
						{NC_SITE_SETTINGS.author_page?.show_top_categories && (
							<SectionTrendingTopic categories={_top10Categories} />
						)}

						{/* SUBCRIBES */}
						{NC_SITE_SETTINGS.author_page?.show_newsletter_section && (
							<SectionSubscribe2 />
						)}
					</div>
				</AuthorLayout>
			</PageLayout>
		</>
	)
}

export default AuthorPostsChild
