import { gql } from '@apollo/client'
import { NcmazFaustBlockTermsFragmentFragment } from '../__generated__/graphql'
import { WordPressBlock } from '@faustwp/blocks'
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection'
import Empty from '@/components/Empty'
import { TCategoryCardFull } from '@/components/CardCategory1/CardCategory1'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const DynamicSectionGridCategoryBox = dynamic(
	() => import('../components/SectionGridCategoryBox/SectionGridCategoryBox'),
)

const DynamicSectionSliderNewCategories = dynamic(
	() =>
		import(
			'../components/SectionSliderNewCategories/SectionSliderNewCategories'
		),
)

const NcmazFaustBlockTerms: WordPressBlock<
	NcmazFaustBlockTermsFragmentFragment & {
		renderedHtml?: string
		clientId?: string
		parentClientId?: string
	}
> = (props) => {
	const { blockVariation, hasBackground } = props.attributes || {}

	if (!props.renderedHtml) {
		return null
	}

	let dataObject = null
	try {
		// <div hidden> {json here} </div>
		// use regex to remove the div tags
		const jsontext = props.renderedHtml.replace(
			/<div data-block-json-wrap hidden>|<\/div>/g,
			'',
		)
		dataObject = JSON.parse(jsontext)
	} catch (error) {}

	return (
		<div className={`not-prose relative ${hasBackground ? 'py-16' : ''}`}>
			{dataObject === null && (
				<div dangerouslySetInnerHTML={{ __html: props.renderedHtml }} />
			)}

			{hasBackground ? <BackgroundSection /> : null}
			{!!props.renderedHtml && (
				<Content
					blockVariation={blockVariation}
					renderedHtml={props.renderedHtml}
					dataObject={dataObject}
				/>
			)}
		</div>
	)
}

function Content({
	blockVariation,
	dataObject,
	renderedHtml,
}: {
	blockVariation?: string | null
	renderedHtml: string
	dataObject?: {
		block_terms: TCategoryCardFull[]
		errors?: Record<string, any>[]
	} | null
}) {
	const [dataInitTerms_state, setDataInitTerms_state] = useState<
		TCategoryCardFull[]
	>([])
	const [dataInitErrors_state, setDataInitErrors_state] =
		useState<Record<string, any>[]>()
	//
	const dataInitTerms = dataObject?.block_terms || dataInitTerms_state
	const dataInitErrors = dataObject?.errors || dataInitErrors_state
	//

	useEffect(() => {
		if (typeof window === 'undefined' || dataObject !== null) {
			return
		}

		// Deprecated, will be removed in future official versions!!!
		// Deprecated, will be removed in future official versions!!!
		const renderedHtmlNode = document.createElement('div')
		renderedHtmlNode.innerHTML = renderedHtml

		const contentNode = renderedHtmlNode.querySelector(
			'.ncmazfc-block-content-common-class',
		)

		const dataInitTerms: TCategoryCardFull[] = JSON.parse(
			contentNode?.getAttribute('data-ncmazfc-init-terms') || 'null',
		)
		const dataInitErrors = JSON.parse(
			contentNode?.getAttribute('data-ncmazfc-init-errors') || 'null',
		)

		setDataInitTerms_state(dataInitTerms)
		setDataInitErrors_state(dataInitErrors)
	}, [])

	return (
		<TermBlockLayoutType
			dataInitTerms={dataInitTerms}
			dataInitErrors={dataInitErrors}
			blockVariation={blockVariation}
		/>
	)
}

export function TermBlockLayoutType({
	dataInitErrors,
	dataInitTerms,
	blockVariation,
}: {
	dataInitErrors?: Record<string, any>[]
	dataInitTerms?: TCategoryCardFull[]
	blockVariation?: string | null
}) {
	if (dataInitErrors) {
		console.error('_____ NcmazFaustBlockTerms: dataInitErrors', {
			blockVariation,
			dataInitErrors,
		})
	}

	if (!dataInitTerms || !dataInitTerms?.length) {
		return <Empty />
	}

	const dataLists = dataInitTerms

	switch (blockVariation) {
		case 'grid-1':
			return (
				<DynamicSectionGridCategoryBox
					categories={dataLists}
					categoryCardType="card1"
				/>
			)
		case 'grid-2':
			return (
				<DynamicSectionGridCategoryBox
					categories={dataLists}
					categoryCardType="card2"
				/>
			)
		case 'grid-3':
			return (
				<DynamicSectionGridCategoryBox
					categories={dataLists}
					categoryCardType="card3"
				/>
			)
		case 'grid-4':
			return (
				<DynamicSectionGridCategoryBox
					categories={dataLists}
					categoryCardType="card4"
				/>
			)
		case 'grid-5':
			return (
				<DynamicSectionGridCategoryBox
					categories={dataLists}
					categoryCardType="card5"
				/>
			)
		//
		case 'slider-1':
			return (
				<DynamicSectionSliderNewCategories
					categories={dataLists}
					categoryCardType="card1"
				/>
			)
		case 'slider-2':
			return (
				<DynamicSectionSliderNewCategories
					categories={dataLists}
					categoryCardType="card2"
				/>
			)
		case 'slider-3':
			return (
				<DynamicSectionSliderNewCategories
					categories={dataLists}
					categoryCardType="card3"
				/>
			)
		case 'slider-4':
			return (
				<DynamicSectionSliderNewCategories
					categories={dataLists}
					categoryCardType="card4"
				/>
			)
		case 'slider-5':
			return (
				<DynamicSectionSliderNewCategories
					categories={dataLists}
					categoryCardType="card5"
					itemPerRow={4}
				/>
			)

		default:
			return (
				<DynamicSectionSliderNewCategories
					categoryCardType="card4"
					categories={dataLists}
				/>
			)
	}
}

export const NcmazFaustBlockTermsFragments = {
	entry: gql`
		fragment NcmazFaustBlockTermsFragment on NcmazFaustBlockTerms {
			attributes {
				blockVariation
				hasBackground
			}
		}
	`,
	key: `NcmazFaustBlockTermsFragment`,
}

NcmazFaustBlockTerms.displayName = 'NcmazFaustBlockTerms'
export default NcmazFaustBlockTerms
