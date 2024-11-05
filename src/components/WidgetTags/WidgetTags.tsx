import { FC } from 'react'
import Tag from '@/components/Tag/Tag'
import WidgetHeading1 from '../WidgetHeading1/WidgetHeading1'
import { FragmentType } from '@/__generated__'
import { NC_TAG_SHORT_FIELDS_FRAGMENT } from '@/fragments'
import { getTagDataFromTagFragment } from '@/utils/getTagDataFromTagFragment'

export interface WidgetTagsProps {
	className?: string
	tags?: FragmentType<typeof NC_TAG_SHORT_FIELDS_FRAGMENT>[]
}

const WidgetTags: FC<WidgetTagsProps> = ({
	className = 'bg-neutral-100/70 dark:bg-neutral-800',
	tags,
}) => {
	return (
		<div className={`nc-WidgetTags overflow-hidden rounded-3xl ${className}`}>
			<WidgetHeading1 title="💡 More tags" viewAllLink="/" />
			<div className="flex flex-wrap p-4 xl:p-5">
				{tags?.map(tag => (
					<Tag
						className="mb-2 mr-2"
						// @ts-ignore
						key={tag.databaseId}
						{...getTagDataFromTagFragment(tag)}
					/>
				))}
			</div>
		</div>
	)
}

export default WidgetTags
