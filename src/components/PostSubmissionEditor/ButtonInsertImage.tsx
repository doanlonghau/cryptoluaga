import CircleLoading from '@/components/Loading/CircleLoading'
import { useState, FC, useEffect } from 'react'
import toast from 'react-hot-toast'
import { EditorItemImageAttrs } from './MenuBar'
import ModalUploadImage from './ModalUploadImage'
import isImageFromUrl from '@/utils/IsImageFromUrl'
import { PencilIcon } from '@heroicons/react/24/outline'
import getTrans from '@/utils/getTrans'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface ButtonInsertImageProps {
	className?: string
	contentClassName?: string
	onChangeImage?: (image: ImageState) => void
	defaultImage?: ImageState
}

export interface ImageState {
	sourceUrl: string
	databaseId?: number
	id?: string
	altText?: string
}

const ButtonInsertImage: FC<ButtonInsertImageProps> = ({
	className = 'flex-1',
	contentClassName = 'px-3 py-8',
	onChangeImage = () => {},
	defaultImage = { sourceUrl: '' },
}) => {
	const [imageState, setImageState] = useState<ImageState>(defaultImage)
	let [isOpen, setIsOpen] = useState(false)
	let [isLoading, setisLoading] = useState(false)

	const T = getTrans()
	//
	function closeModal() {
		setIsOpen(false)
		setImageState(defaultImage)
	}
	function openModal() {
		setIsOpen(true)
	}

	const handleApply = ({ url, alt }: EditorItemImageAttrs) => {
		setisLoading(true)

		isImageFromUrl(url)
			.then(value => {
				if (!value) {
					toast.error(
						T.pageSubmission['The url is not an image, please try again.'],
					)
					return
				}
				onChangeImage({ sourceUrl: url, altText: alt, id: '' })
				setImageState({ sourceUrl: url, altText: alt, id: '' })
				closeModal()
			})
			.catch(error => {
				toast.error(`Error: ${error.message}`)
			})
			.finally(() => {
				setisLoading(false)
			})
	}

	const handleFileDelete = () => {
		onChangeImage({ sourceUrl: '', altText: '', id: '' })
		setImageState({ sourceUrl: '', altText: '', id: '' })
		closeModal()
	}
	//

	useEffect(() => {
		setImageState(defaultImage)
	}, [defaultImage.sourceUrl])

	let LOADING = isLoading

	return (
		<>
			<div className={className}>
				<div
					className={`group block ${
						LOADING ? 'animate-pulse cursor-not-allowed' : 'cursor-pointer'
					}`}
				>
					<div
						className={`relative z-0 mt-1 flex justify-center rounded-xl border border-dashed border-neutral-300 transition-colors group-hover:border-neutral-400 dark:border-neutral-600`}
					>
						<div className="flex-1 text-center">
							{!imageState.sourceUrl && (
								<div className="p-2">
									<div className={`text-center ${contentClassName}`}>
										<svg
											className="mx-auto h-12 w-12 text-neutral-400"
											stroke="currentColor"
											fill="none"
											viewBox="0 0 48 48"
											aria-hidden="true"
										>
											<path
												d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											></path>
										</svg>

										<div className="mt-3 flex justify-center text-sm text-neutral-600 dark:text-neutral-300">
											<div className="flex-shrink-0 cursor-pointer rounded-md font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500 dark:text-primary-400">
												{LOADING ? (
													<CircleLoading
														className="ml-3 text-blue-600"
														childClassName="w-5 h-5"
													/>
												) : (
													<span>{T.pageSubmission['Upload a file']}</span>
												)}
											</div>
										</div>
										<p className="text-xs text-neutral-500 dark:text-neutral-400">
											PNG, JPG, GIF, WEBP, SVG ...
										</p>
									</div>
								</div>
							)}

							{imageState.sourceUrl && (
								<div className="">
									<img
										src={imageState.sourceUrl}
										className="w-full rounded-lg shadow-lg"
										sizes="(max-width: 475px) 100vw, 600px"
										alt={imageState.altText || 'image'}
									/>
								</div>
							)}
						</div>

						<div
							className={`absolute inset-0 rounded-xl ${
								imageState.sourceUrl
									? 'transition-colors group-hover:bg-black/10'
									: ''
							}`}
							aria-hidden="true"
							onClick={openModal}
						/>

						{!!imageState.sourceUrl && (
							<>
								<div
									className="absolute start-2.5 top-2.5 z-20 flex cursor-pointer items-center gap-1 rounded-md bg-white p-1.5 pl-2 pr-2.5 text-xs font-medium text-black opacity-0 transition-opacity group-hover:opacity-100"
									title={T['Edit image']}
									onClick={openModal}
								>
									<PencilIcon className="h-4 w-4" />
									{T['Edit']}
								</div>
								<div
									className="absolute end-1 top-1 z-20 flex cursor-pointer items-center gap-1 rounded-full bg-white p-1.5 text-xs text-black"
									title={T['Delete image']}
									onClick={handleFileDelete}
								>
									<XMarkIcon className="h-4 w-4" />
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			<ModalUploadImage
				onClickApply={handleApply}
				onDelete={handleFileDelete}
				open={isOpen}
				hanldeClose={closeModal}
				isLoading={LOADING}
				defaultImage={{
					alt: imageState.altText,
					url: imageState.sourceUrl,
				}}
				enableUpload={
					NC_SITE_SETTINGS['submissions-settings']?.allow_upload_media
				}
			/>
		</>
	)
}

export default ButtonInsertImage
