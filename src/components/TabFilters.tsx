'use client'

import { FC } from 'react'
import ModalSelectCategories from './ModalSelectCategories'
import ModalSelectTags from './ModalSelectTags'
import ModalSelectAuthors from './ModalSelectAuthors'
import ModalSelectKeyword from './ModalSelectKeyword'

interface Props {
	onCategoriesUpdated: (ids: number[]) => void
	onTagsUpdated: (ids: number[]) => void
	onAuthorsUpdated: (ids: number[]) => void
	onKeywordUpdated: (keyword: string) => void
	initCatIds?: number[]
	initTagIds?: number[]
	initAuthorIds?: number[]
	initKeyword?: string
}
//
const TabFilters: FC<Props> = ({
	initCatIds = [],
	initTagIds = [],
	initAuthorIds = [],
	initKeyword = '',
	onCategoriesUpdated,
	onTagsUpdated,
	onAuthorsUpdated,
	onKeywordUpdated,
}) => {
	// OK
	const renderTabsCategories = () => {
		return (
			<>
				<ModalSelectCategories
					initIds={initCatIds}
					onUpdated={(ids) => {
						onCategoriesUpdated(ids)
					}}
				/>
			</>
		)
	}

	// OK
	const renderTabsTags = () => {
		return (
			<div>
				<ModalSelectTags
					initIds={initTagIds}
					onUpdated={(ids) => {
						onTagsUpdated(ids)
					}}
				/>
			</div>
		)
	}

	const renderTabsAuthors = () => {
		return (
			<div>
				<ModalSelectAuthors
					initIds={initAuthorIds}
					onUpdated={(ids) => {
						onAuthorsUpdated(ids)
					}}
				/>
			</div>
		)
	}

	const renderTabsKeyword = () => (
		<div>
			<ModalSelectKeyword
				initText={initKeyword}
				onUpdated={(keyword) => {
					onKeywordUpdated(keyword)
				}}
			/>
		</div>
	)

	return (
		<div className="hiddenScrollbar flex overflow-auto sm:overflow-visible">
			<div className="flex flex-1 gap-2.5 p-1.5 sm:p-0 md:gap-4">
				{renderTabsKeyword()}
				{renderTabsCategories()}
				{renderTabsTags()}
				{renderTabsAuthors()}
			</div>
		</div>
	)
}

export default TabFilters
