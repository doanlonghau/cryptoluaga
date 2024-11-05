import { PlusIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'
import Link from 'next/link'
import { useLoginModal } from '@/hooks/useLoginModal'

import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import { RootState } from '@/stores/store'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import getTrans from '@/utils/getTrans'

interface Props {
	className?: string
}

const CreateBtn: FC<Props> = ({ className = 'hidden md:block ' }) => {
	const { isReady, isAuthenticated } = useSelector(
		(state: RootState) => state.viewer.authorizedUser,
	)
	const { openLoginModal } = useLoginModal()
	const T = getTrans()

	if (NC_SITE_SETTINGS['submissions-settings']?.enable === false) {
		return null
	}

	return (
		<div className={`LangDropdown ${className}`}>
			<Link
				href="/submission"
				className={`focus-visible:ring-ring group inline-flex h-10 items-center justify-center rounded-xl px-3 py-1.5 text-sm font-medium text-neutral-900 opacity-80 hover:bg-neutral-100 hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 sm:h-12 dark:text-neutral-200 dark:hover:bg-neutral-800`}
				onClick={e => {
					if (!isAuthenticated) {
						e.preventDefault()
						if (!isReady) {
							toast.error(T['Please wait a moment, data is being prepared.'])
							return
						}
						openLoginModal('/submission')
					}
				}}
			>
				<PlusIcon className="-ms-1 h-5 w-5" />
				<span className="ms-2">{T.Create}</span>
			</Link>
		</div>
	)
}
export default CreateBtn
