import { FC } from 'react'
import AvatarDropdown from './AvatarDropdown'
import SwitchDarkMode from '../SwitchDarkMode/SwitchDarkMode'
import Navigation from '../Navigation/Navigation'
import { MainNav1Props } from './MainNav1'
import Brand from './Brand'
import CreateBtn from './CreateBtn'
import dynamic from 'next/dynamic'
import { HeaderSearchForm, SearchIconBtn } from './HeaderSearch'

const DynamicMenuBar = dynamic(() => import('@/components/MenuBar/MenuBar'), {
	ssr: false,
})

export interface MainNav2Props extends MainNav1Props {}

const MainNav2: FC<MainNav2Props> = ({ menuItems, description, title }) => {
	return (
		<div className="nc-MainNav2 relative z-10 border-b border-neutral-200/70 bg-white dark:border-transparent dark:bg-neutral-900">
			<div className="px-4 xl:container">
				<div className="flex h-16 justify-between sm:h-20">
					<div className="flex flex-1 items-center lg:hidden">
						<DynamicMenuBar menuItems={menuItems} />
					</div>

					<div className="hidden items-center gap-x-3 sm:gap-x-8 lg:flex">
						<Brand title={title} description={description} />

						<div className="hidden h-8 border-s border-neutral-200 md:block dark:border-neutral-700"></div>

						<div className="hidden w-64 max-w-xs sm:block xl:w-80">
							<HeaderSearchForm />
						</div>
					</div>

					<div className="flex flex-1 justify-end">
						<Navigation
							maxItemsToShow={3}
							menuItems={menuItems}
							variation="nav2"
							className="hidden lg:flex"
						/>
						<div className="mx-2 hidden h-8 self-center border-l border-neutral-200 md:block dark:border-neutral-700"></div>
						<CreateBtn className="self-center" />
						<SwitchDarkMode className="hidden self-center lg:flex" />
						<SearchIconBtn className="lg:hidden" />
						<AvatarDropdown className="self-center" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainNav2
