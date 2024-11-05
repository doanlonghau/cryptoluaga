import { FC, useEffect, useState } from 'react'
import NcModal from '@/components/NcModal/NcModal'
import Button from '@/components/Button/Button'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import ButtonPrimary from './Button/ButtonPrimary'
import getTrans from '@/utils/getTrans'
import ButtonThird from './Button/ButtonThird'
import { SearchIcon } from './Icons/Icons'
import Input from './Input/Input'
import { Description, Field, Label } from '@headlessui/react'
import clsx from 'clsx'

const T = getTrans()

interface Props {
	onUpdated: (k: string) => void
	initText?: string
}

const ModalSelectKeyword: FC<Props> = ({ onUpdated, initText = '' }) => {
	const [keyword, setKeyword] = useState<string>(initText)

	useEffect(() => {
		setKeyword(initText)
	}, [initText])

	const renderModalContent = (closeModal: () => void) => {
		return (
			<form
				onSubmit={(e) => {
					e.preventDefault()
					onUpdated(keyword)
					closeModal()
				}}
				className="block w-full p-4"
			>
				<Field>
					<Label className="text-sm/6 font-medium">
						{T['Enter keyword to search']}
					</Label>
					<Description className="text-sm/6 text-slate-400"></Description>
					<Input
						autoFocus
						data-autofocus
						type="text"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						className={clsx(
							'mt-3 block w-full rounded-xl border border-slate-200 bg-white/5 px-3 py-1.5 text-sm/6',
							'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
						)}
					/>
				</Field>
			</form>
		)
	}

	return (
		<div className="nc-ModalSelectKeyword">
			<NcModal
				renderTrigger={(openModal) => (
					<Button
						pattern="third"
						fontSize="text-sm font-medium"
						className={
							!!initText.length
								? 'ring-2 ring-neutral-800 hover:ring-neutral-800'
								: undefined
						}
						onClick={() => {
							openModal()
						}}
					>
						{!!initText.length && (
							<div className="pointer-events-none absolute -right-1 -top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-800 p-0.5 text-center text-[0.55rem] leading-none text-white ring ring-white ring-offset-0 dark:bg-neutral-200 dark:text-black dark:ring-white">
								{1}
							</div>
						)}

						<SearchIcon className="-ms-1.5 me-2 h-5 w-5" />
						<div>
							<span>{T.Keyword}</span>
						</div>
						<ChevronDownIcon
							className="-me-1 ms-2 h-4 w-4"
							aria-hidden="true"
						/>
					</Button>
				)}
				onOpenModal={() => setKeyword(initText)}
				contentExtraClass="max-w-2xl"
				modalTitle={T['Keyword']}
				renderContent={renderModalContent}
				enableFooter={true}
				renderFooter={(closeModal) => {
					return (
						<div className="flex items-center justify-between">
							<Button
								pattern="link"
								onClick={() => setKeyword('')}
								// sizeClass="py-3 px-4 sm:py-3 sm:px-6"
							>
								{T['Clear']}
							</Button>
							<ButtonPrimary
								onClick={() => {
									onUpdated(keyword)
									closeModal()
								}}
								// sizeClass="py-3 px-4 sm:py-3 sm:px-6"
							>
								{T['Apply']}
							</ButtonPrimary>
						</div>
					)
				}}
			/>
		</div>
	)
}

export default ModalSelectKeyword
