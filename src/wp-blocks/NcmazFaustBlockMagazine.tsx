import { gql } from '@apollo/client'
import { NcmazFaustBlockMagazineFragmentFragment } from '../__generated__/graphql'
import { WordPressBlock } from '@faustwp/blocks'
import NcmazFaustBlockMagazineClient from './NcmazFaustBlockMagazineClient'

const NcmazFaustBlockMagazine: WordPressBlock<
	NcmazFaustBlockMagazineFragmentFragment & {
		renderedHtml?: string
		clientId?: string
		parentClientId?: string
	}
> = (props) => {
	const { hasBackground } = props.attributes || {}

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
	} catch (error) {
		console.warn(
			' 🚀 _____ NcmazFaustBlockMagazine JSON.parse error, need to update the Ncmaz-faust-core plugin! ',
		)
	}

	return (
		<div className={`not-prose relative ${hasBackground ? 'py-16' : ''}`}>
			{dataObject === null && (
				<div dangerouslySetInnerHTML={{ __html: props.renderedHtml || '' }} />
			)}

			<NcmazFaustBlockMagazineClient {...props} dataObject={dataObject} />
		</div>
	)
}

export const NcmazFaustBlockMagazineFragments = {
	entry: gql`
		fragment NcmazFaustBlockMagazineFragment on NcmazFaustBlockMagazine {
			attributes {
				blockVariation
				className
				hasBackground
				showViewAll
			}
		}
	`,
	key: `NcmazFaustBlockMagazineFragment`,
}

NcmazFaustBlockMagazine.displayName = 'NcmazFaustBlockMagazine'
export default NcmazFaustBlockMagazine
