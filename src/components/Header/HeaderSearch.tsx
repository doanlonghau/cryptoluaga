import getTrans from '@/utils/getTrans'
import { useRouter } from 'next/router'
import Input from '../Input/Input'
import { SearchIcon } from '../Icons/Icons'
import SearchModal from './SearchModal'

export const HeaderSearchForm = () => {
	const T = getTrans()
	const renderTrigger = () => {
		return (
			<div className="group relative cursor-pointer">
				<button className="absolute inset-0"></button>
				<Input
					type="text"
					placeholder={T['Type to search...']}
					className="!w-40 pr-5 group-hover:border-neutral-300 md:!w-full md:pr-10 dark:placeholder:text-neutral-400 dark:group-hover:border-neutral-400"
					sizeClass="h-[42px] pl-4 py-3"
					rounded="rounded-full"
					disabled
				/>
				<div className="absolute inset-y-0 end-0 flex items-center justify-center rounded-full pe-3 ps-2 text-neutral-500 dark:text-neutral-400">
					<SearchIcon className="h-5 w-5" />
				</div>
			</div>
		)
	}

	return <SearchModal renderTrigger={renderTrigger} />
}

export const HeaderSearchForm2 = () => {
	const router = useRouter()
	const T = getTrans()
	const renderTrigger = () => {
		return (
			<form
				className="group relative"
				onSubmit={e => {
					e.preventDefault()
					router.push('/search/posts/' + e.currentTarget.search.value || '')
				}}
			>
				<Input
					type="search"
					placeholder={T['Type to search...']}
					className="!w-40 pr-5 group-hover:border-neutral-300 md:!w-full md:pr-10 dark:placeholder:text-neutral-400 dark:group-hover:border-neutral-400"
					sizeClass="h-[42px] pl-4 py-3"
					name="search"
					id="search"
					rounded="rounded-full"
				/>
				<button
					type="submit"
					className="absolute inset-y-0 end-0 flex items-center justify-center rounded-full pe-3 ps-2 text-neutral-500 dark:text-neutral-400"
				>
					<SearchIcon className="h-5 w-5" />
				</button>
			</form>
		)
	}

	return <SearchModal renderTrigger={renderTrigger} />
}

export const SearchIconBtn = ({
	className = 'lg:hidden',
}: {
	className?: string
}) => {
	const renderTrigger = () => {
		return (
			<div className={`relative block self-center ${className}`}>
				<button className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none sm:h-12 sm:w-12 dark:text-neutral-300 dark:hover:bg-neutral-800">
					<SearchIcon className="h-5 w-5" />
				</button>
			</div>
		)
	}

	return (
		<SearchModal triggerClassName="self-center" renderTrigger={renderTrigger} />
	)
}
