import Card10 from '@/components/Card10/Card10'
import Card10V3 from '@/components/Card10/Card10V3'
import { FC } from 'react'
import { SectionMagazine1Props } from './SectionMagazine1'

export interface SectionMagazine7Props extends SectionMagazine1Props {}

const SectionMagazine7: FC<SectionMagazine7Props> = ({
	posts,
	className = '',
}) => {
	const post1 = posts[0]
	const post2 = posts[1]
	const subPosts = posts.filter((_, i) => i >= 2)

	return (
		<div className={`nc-SectionMagazine7 relative ${className}`}>
			<div className={`grid grid-cols-1 gap-6 md:gap-7`}>
				<div className={`grid gap-6 md:gap-8 lg:grid-cols-2`}>
					{post1 ? <Card10V3 post={post1} /> : null}
					{post2 ? <Card10V3 galleryType={2} post={post2} /> : null}
				</div>
				{subPosts.length && (
					<div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3 xl:grid-cols-4">
						{subPosts.map(item => (
							<Card10 post={item} key={item.databaseId} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default SectionMagazine7
