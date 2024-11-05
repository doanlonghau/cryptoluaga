'use client'
import { FC, ReactNode, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop } from '@headlessui/react'
import Button from '../Button/Button'
import ButtonClose from '../ButtonClose/ButtonClose'
import { DialogPanel, DialogTitle } from '@headlessui/react'
import clsx from 'clsx'

export interface NcModalProps {
	renderContent: (closeModal: () => void) => ReactNode
	renderFooter?: (closeModal: () => void) => ReactNode
	renderTrigger?: (openModal: () => void) => ReactNode
	enableFooter?: boolean
	containerClassName?: string
	contentExtraClass?: string
	contentPaddingClass?: string
	triggerText?: ReactNode
	modalTitle?: ReactNode
	isOpenProp?: boolean
	onCloseModal?: () => void
	onOpenModal?: () => void
}

const NcModal: FC<NcModalProps> = ({
	renderTrigger,
	renderContent,
	renderFooter,
	enableFooter = true,
	containerClassName = '',
	contentExtraClass = 'max-w-screen-xl',
	contentPaddingClass = 'p-4 md:px-6 md:py-5',
	triggerText = 'Open Modal',
	modalTitle = 'Modal title',
	isOpenProp,
	onCloseModal,
	onOpenModal,
}) => {
	let [isOpen, setIsOpen] = useState(!!isOpenProp)

	function closeModal() {
		if (typeof isOpenProp !== 'boolean') {
			setIsOpen(false)
		}
		onCloseModal && onCloseModal()
	}

	function openModal() {
		if (typeof isOpenProp !== 'boolean') {
			setIsOpen(true)
			onOpenModal && onOpenModal()
		}
	}

	useEffect(() => {
		setIsOpen(!!isOpenProp)
	}, [isOpenProp])

	return (
		<div className={`nc-Modal ${containerClassName}`}>
			{renderTrigger ? (
				renderTrigger(openModal)
			) : (
				<Button onClick={openModal}> {triggerText} </Button>
			)}

			<Dialog
				open={isOpen}
				as="div"
				className={clsx(
					'fixed inset-0 z-50 transition duration-300 ease-out',
					'data-[closed]:opacity-0',
				)}
				onClose={closeModal}
				transition
			>
				<div className="min-h-screen px-1 text-center md:px-4">
					<DialogBackdrop
						className="fixed inset-0 bg-neutral-900 bg-opacity-60 dark:bg-opacity-85"
						aria-hidden="true"
					/>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>

					<DialogPanel
						className={`inline-flex w-full transform flex-col overflow-hidden rounded-2xl border border-black border-opacity-5 bg-white text-left align-middle text-neutral-900 shadow-xl transition-all dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 ${contentExtraClass} max-h-[85vh]`}
					>
						<header
							className={`relative flex-shrink-0 px-6 py-4 text-center ${
								!!modalTitle
									? 'border-b border-neutral-100 md:py-5 dark:border-neutral-700'
									: ''
							}`}
						>
							<ButtonClose
								onClick={closeModal}
								className="absolute left-2 top-2 sm:left-3 sm:top-3"
							/>
							{!!modalTitle && (
								<DialogTitle
									as="h3"
									className="mx-10 text-base font-semibold text-neutral-900 lg:text-xl dark:text-neutral-200"
								>
									{modalTitle}
								</DialogTitle>
							)}
						</header>
						<div
							className={`hiddenScrollbar flex-1 overflow-y-auto ${contentPaddingClass}`}
						>
							{renderContent(closeModal)}
						</div>

						{renderFooter && enableFooter && (
							<footer className="flex-shrink-0">
								<div className="border-t border-neutral-100 px-6 py-4 md:py-5 dark:border-neutral-700">
									{renderFooter(closeModal)}
								</div>
							</footer>
						)}
					</DialogPanel>
				</div>
			</Dialog>
		</div>
	)
}

export default NcModal
