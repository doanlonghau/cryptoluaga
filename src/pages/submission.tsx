import { GetStaticPropsContext } from 'next'
import { FaustPage, getNextStaticProps } from '@faustwp/core'
import CreateNewPostEditor from '@/components/PostSubmissionEditor/CreateNewPostEditor'
import { useRouter } from 'next/router'
import CircleLoading from '@/components/Loading/CircleLoading'
import SwitchDarkMode from '@/components/SwitchDarkMode/SwitchDarkMode'
import AvatarDropdown from '@/components/Header/AvatarDropdown'
import Logo from '@/components/Logo/Logo'
import CreateBtn from '@/components/Header/CreateBtn'
import { useEffect } from 'react'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import Page404Content from '@/container/404Content'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores/store'

const Page: FaustPage<{}> = (props) => {
	const { isReady, isAuthenticated } = useSelector(
		(state: RootState) => state.viewer.authorizedUser,
	)
	const router = useRouter()

	if (NC_SITE_SETTINGS['submissions-settings']?.enable === false) {
		return <Page404Content />
	}

	useEffect(() => {
		if (isAuthenticated === false) {
			router.replace('/login')
		}
	}, [isAuthenticated])

	if (!isReady) {
		return (
			<div className="container flex items-center justify-center p-5">
				<CircleLoading />
			</div>
		)
	}

	const renderHeader = () => {
		return (
			<div className="relative z-20 w-full lg:mx-auto lg:max-w-7xl lg:px-8">
				<div className="flex h-16 items-center gap-x-4 border-b border-neutral-200 px-4 shadow-sm sm:h-20 sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none dark:border-neutral-600">
					<div className="flex flex-1 gap-4 self-stretch lg:gap-6">
						<div className="relative flex flex-1 items-center">
							<Logo />
						</div>
						<div className="flex items-center gap-x-4 lg:gap-x-6">
							{/* Separator */}
							<div
								className="hidden lg:block lg:h-6 lg:w-px lg:bg-neutral-200 dark:bg-neutral-600"
								aria-hidden="true"
							/>

							{/* Profile dropdown */}
							<div className="flex flex-1 items-center justify-end">
								<CreateBtn className="block" />
								<SwitchDarkMode />
								<AvatarDropdown />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			<div className="relative flex h-[100vh] w-full flex-col">
				{renderHeader()}
				<CreateNewPostEditor isSubmittingPage />
			</div>
		</>
	)
}

export function getStaticProps(ctx: GetStaticPropsContext) {
	return getNextStaticProps(ctx, {
		Page,
		revalidate: false,
	})
}

export default Page
