import { useAuth } from '@faustwp/core'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	updateViewer as updateViewerToStore,
	updateAuthorizedUser,
} from '@/stores/viewer/viewerSlice'
import { updateGeneralSettings } from '@/stores/general-settings/generalSettingsSlice'
import ControlSettingsDemo from './ControlSettingsDemo'
import CookiestBoxPopover from '@/components/CookiestBoxPopover'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'
import { initLocalPostsSavedListFromLocalstored } from '@/stores/localPostSavedList/localPostsSavedListSlice'
import { usePathname } from 'next/navigation'
import { CMSUserMetaResponseData } from '@/pages/api/cms-user-meta/[id]'
import { addViewerReactionPosts } from '@/stores/viewer/viewerSlice'
import { CMSReactionPostsResponseData } from '@/pages/api/cms-reaction-posts-by-reaction/[...param]'

export function SiteWrapperChild({
	...props
}: {
	__TEMPLATE_QUERY_DATA__: any
}) {
	const { isAuthenticated, isReady, loginUrl, viewer } = useAuth()
	const dispatch = useDispatch()
	const pathname = usePathname()

	const [isFirstFetchApis, setIsFirstFetchApis] = useState(false)

	useEffect(() => {
		if (!isAuthenticated || !viewer?.userId || isFirstFetchApis) {
			return
		}
		setIsFirstFetchApis(true)
		dispatch(updateViewerToStore(viewer))
		// get user meta data
		fetch('/api/cms-user-meta/' + viewer?.userId)
			.then(res => res.json())
			.then((data: CMSUserMetaResponseData) => {
				const user = data?.data?.user
				if (user) {
					dispatch(updateViewerToStore(user))
				}
			})
			.catch(error => {
				console.error(error)
			})

		// get user reaction posts data (save)
		fetch(`/api/cms-reaction-posts-by-reaction/${viewer.userId}/save`)
			.then(res => res.json())
			.then((data: CMSReactionPostsResponseData) => {
				const nodes = data?.data?.user?.userReactionPosts?.nodes || []
				dispatch(addViewerReactionPosts(nodes))
			})
			.catch(error => {
				console.error(error)
			})

		// get user reaction posts data (like)
		fetch(`/api/cms-reaction-posts-by-reaction/${viewer.userId}/like`)
			.then(res => res.json())
			.then((data: CMSReactionPostsResponseData) => {
				const nodes = data?.data?.user?.userReactionPosts?.nodes || []
				dispatch(addViewerReactionPosts(nodes))
			})
			.catch(error => {
				console.error(error)
			})
	}, [isAuthenticated, viewer?.userId, isFirstFetchApis])

	// update general settings to store
	useEffect(() => {
		const generalSettings =
			props?.__TEMPLATE_QUERY_DATA__?.generalSettings ?? {}
		dispatch(updateGeneralSettings(generalSettings))
	}, [])

	useEffect(() => {
		const initialStateLocalSavedPosts: number[] = JSON.parse(
			typeof window !== 'undefined'
				? localStorage?.getItem('localSavedPosts') || '[]'
				: '[]',
		)
		dispatch(
			initLocalPostsSavedListFromLocalstored(initialStateLocalSavedPosts),
		)
	}, [])

	// update updateAuthorizedUser to store
	useEffect(() => {
		dispatch(
			updateAuthorizedUser({
				isAuthenticated,
				isReady,
				loginUrl,
			}),
		)
	}, [isAuthenticated])

	if (pathname?.startsWith('/ncmaz_for_ncmazfc_preview_blocks')) {
		return null
	}

	return (
		<div>
			<CookiestBoxPopover />
			<ControlSettingsDemo />
			<MusicPlayer />
		</div>
	)
}
