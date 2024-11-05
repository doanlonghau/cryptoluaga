import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Switch,
	Transition,
} from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/solid'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Input from '@/components/Input/Input'
import Label from '@/components/Label/Label'
import Textarea from '@/components/Textarea/Textarea'
import { debounce } from 'lodash'
import { FC, Fragment, useState } from 'react'
import ButtonInsertImage, { ImageState } from './ButtonInsertImage'
import ButtonThird from '../Button/ButtonThird'
import Button from '../Button/Button'
import NcModal from '../NcModal/NcModal'
import { PostFormatNameType } from '@/utils/getPostDataFromPostFragment'
import getTrans from '@/utils/getTrans'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'

type GalleryImages = Record<string, ImageState>

const postFormats: PostFormatNameType[] = [
	'standard',
	'video',
	'audio',
	'gallery',
]

export type PostStyleTemplate = 'style1' | 'style2' | 'style3' | 'style4'
export interface PostOptionsData {
	postFormatsSelected: PostFormatNameType
	excerptText: string
	objGalleryImgs?: GalleryImages
	videoUrl: string
	audioUrl: string
	isAllowComments: boolean
	timeSchedulePublication?: string
	showRightSidebar: boolean
	postStyleSelected?: PostStyleTemplate
}

interface PostOptionsBtnProps {
	onSubmit: (data: PostOptionsData) => void
	defaultData: PostOptionsData
}

const postStyles: {
	id: number
	name: PostStyleTemplate
	title: string
}[] = [
	{ id: 1, name: 'style1', title: 'Style 1' },
	{ id: 2, name: 'style2', title: 'Style 2' },
	{ id: 3, name: 'style3', title: 'Style 3' },
	{ id: 4, name: 'style4', title: 'Style 4' },
]

const PostOptionsBtn: FC<PostOptionsBtnProps> = ({ onSubmit, defaultData }) => {
	const T = getTrans()

	const [postFormatsSelected, setPostFormatsSelected] = useState(
		defaultData.postFormatsSelected || 'standard',
	)
	const [timeSchedulePublication, settimeSchedulePublication] = useState(
		defaultData.timeSchedulePublication,
	)
	const [excerptText, setExcerptText] = useState(defaultData.excerptText)
	const [videoUrl, setVideoUrl] = useState(defaultData.videoUrl)
	const [audioUrl, setAudioUrl] = useState(defaultData.audioUrl)
	const [objGalleryImgs, setObjGalleryImgs] = useState<
		GalleryImages | undefined
	>(defaultData.objGalleryImgs)
	const [isAllowComments, setIsAllowComments] = useState(
		defaultData.isAllowComments,
	)
	const [isShowSidebar, setIsShowSidebar] = useState(
		!!defaultData.showRightSidebar,
	)

	const [postStyleSelected, setPostStyleSelected] = useState(
		postStyles.find(
			(item) => item.name === (defaultData.postStyleSelected || 'style1'),
		),
	)

	//

	const debounceGetExcerpt = debounce(function (e: string) {
		setExcerptText(e)
	}, 200)
	const debounceVideoUrlChange = debounce(function (e: string) {
		setVideoUrl(e)
	}, 200)
	const debounceAudioUrlChange = debounce(function (e: string) {
		setAudioUrl(e)
	}, 200)

	const handleClickApply = () => {
		onSubmit({
			postFormatsSelected,
			excerptText,
			videoUrl,
			audioUrl,
			objGalleryImgs,
			isAllowComments,
			timeSchedulePublication,
			showRightSidebar: isShowSidebar,
			postStyleSelected: postStyleSelected?.name || 'style1',
		})
		toast.success('Post options applied!')
	}

	const handleClickCancel = () => {}
	//

	const renderBtnOpenPopover = (openModal: () => void) => {
		return (
			<Button
				sizeClass="px-3 sm:px-4"
				className="flex-shrink-0 !rounded-2xl"
				title={T.pageSubmission['Post options']}
				pattern="third"
				onClick={openModal}
			>
				<svg
					className="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.0002 22.6298C11.3302 22.6298 10.6502 22.4798 10.1202 22.1698L4.62023 18.9998C2.38023 17.4898 2.24023 17.2598 2.24023 14.8898V9.1098C2.24023 6.7398 2.37023 6.5098 4.57023 5.0198L10.1102 1.8198C11.1602 1.2098 12.8102 1.2098 13.8602 1.8198L19.3802 4.9998C21.6202 6.5098 21.7602 6.7398 21.7602 9.1098V14.8798C21.7602 17.2498 21.6302 17.4798 19.4302 18.9698L13.8902 22.1698C13.3502 22.4798 12.6702 22.6298 12.0002 22.6298ZM12.0002 2.8698C11.5802 2.8698 11.1702 2.9498 10.8802 3.1198L5.38023 6.2998C3.75023 7.3998 3.75023 7.3998 3.75023 9.1098V14.8798C3.75023 16.5898 3.75023 16.5898 5.42023 17.7198L10.8802 20.8698C11.4702 21.2098 12.5402 21.2098 13.1302 20.8698L18.6302 17.6898C20.2502 16.5898 20.2502 16.5898 20.2502 14.8798V9.1098C20.2502 7.3998 20.2502 7.3998 18.5802 6.2698L13.1202 3.1198C12.8302 2.9498 12.4202 2.8698 12.0002 2.8698Z"
						fill="currentColor"
					/>
					<path
						d="M12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75ZM12 9.75C10.76 9.75 9.75 10.76 9.75 12C9.75 13.24 10.76 14.25 12 14.25C13.24 14.25 14.25 13.24 14.25 12C14.25 10.76 13.24 9.75 12 9.75Z"
						fill="currentColor"
					/>
				</svg>
			</Button>
		)
	}

	const renderListBoxPostformat = () => {
		const checkOptionDisabled = (person: string) => {
			const option = person.replace(/^post-format-/g, '') as PostFormatNameType

			const postFormats = NC_SITE_SETTINGS[
				'submissions-settings'
			]?.post_options?.filter((item) => item?.name === 'Post_Format')[0]

			if (!postFormats) return true

			const format = postFormats?.options?.filter(
				(item) => item?.name === option,
			)[0]

			if (!format) return true

			return !format.enable
		}

		return (
			<div>
				<Label
					className="block capitalize"
					title={T.pageSubmission['Post format']}
				>
					{T.pageSubmission['Post format']}
				</Label>
				<Listbox value={postFormatsSelected} onChange={setPostFormatsSelected}>
					<div className="relative z-10 mt-1">
						<ListboxButton as="div">
							<Button pattern="third" fontSize="text-sm font-medium">
								<span className="block truncate capitalize">
									{postFormatsSelected.replace(/^post-format-/g, '')}
								</span>
								<ChevronDownIcon
									className="-me-1 ms-2 h-4 w-4"
									aria-hidden="true"
								/>
							</Button>
						</ListboxButton>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<ListboxOptions
								anchor={{ to: 'bottom start', gap: '4px' }}
								className="absolute end-0 z-50 mt-2 max-h-96 w-52 overflow-auto rounded-xl bg-white py-1 text-sm text-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:text-neutral-200 dark:ring-neutral-700"
							>
								{postFormats.map((person, personIdx) => {
									if (checkOptionDisabled(person)) return null

									return (
										<ListboxOption
											key={personIdx}
											className="relative cursor-default select-none py-2 pe-4 ps-10 data-[focus]:bg-primary-50 data-[focus]:text-primary-700 dark:data-[focus]:bg-neutral-700 dark:data-[focus]:text-neutral-200"
											value={person}
										>
											{({ selected }) => (
												<>
													<span
														className={`block truncate capitalize ${
															selected ? 'font-medium' : 'font-normal'
														}`}
													>
														{person.replace(/^post-format-/g, '')}
													</span>
													{selected ? (
														<span className="absolute inset-y-0 start-0 flex items-center ps-3 text-primary-700 dark:text-neutral-200">
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</ListboxOption>
									)
								})}
							</ListboxOptions>
						</Transition>
					</div>
				</Listbox>
			</div>
		)
	}

	const renderUploadGallery = () => {
		return (
			<div>
				<span className="text-base font-semibold">
					{T.pageSubmission['Gallery images']}
				</span>
				<div className="customScrollBar flex snap-x gap-x-2.5 overflow-x-auto py-2">
					{[
						'image1',
						'image2',
						'image3',
						'image4',
						'image5',
						'image6',
						'image7',
						'image8',
					].map((item, idx) => (
						<div
							className="flex h-full w-48 flex-shrink-0 snap-start flex-col"
							key={item}
						>
							<Label>{`${T.Image} ${idx + 1}`}</Label>
							<ButtonInsertImage
								defaultImage={objGalleryImgs?.[item] || undefined}
								onChangeImage={(image) => {
									setObjGalleryImgs((prevState) => ({
										...(prevState || {}),
										[item]: image,
									}))
								}}
								contentClassName="p-3"
							/>
						</div>
					))}
				</div>
			</div>
		)
	}

	const renderExcerptTextarea = () => {
		const strippedExcerpt =
			excerptText?.trim()?.replace(/^<[^>]+>|<\/[^>]+>$/g, '') || ''
		return (
			<div>
				<Label htmlFor="excerpt" className="block capitalize">
					{T.pageSubmission['Write an excerpt (optional)']}
				</Label>
				<Textarea
					onChange={(event) => {
						debounceGetExcerpt(event.currentTarget.value)
					}}
					defaultValue={strippedExcerpt}
					className="mt-1"
					placeholder="..."
					name="excerpt"
					id="excerpt"
				/>
			</div>
		)
	}

	const renderSchedulePublication = () => {
		return (
			<div>
				<Label htmlFor="Schedule-time">
					{T.pageSubmission['Schedule Publication']} (UTC+0)
				</Label>
				<Input
					onChange={(event) => {
						settimeSchedulePublication(event.currentTarget.value)
					}}
					defaultValue={timeSchedulePublication}
					className="mt-1"
					type="datetime-local"
					id="Schedule-time"
					name="Schedule-time"
					min={new Date().toISOString().slice(0, 16)}
				/>
			</div>
		)
	}

	const renderInputVideoUrl = () => {
		return (
			<div>
				<Label
					htmlFor="video-url"
					className="block capitalize"
					title={T.pageSubmission['Video URL (Youtube, Vimeo, mp4 ... )']}
				>
					{T.pageSubmission['Video URL (Youtube, Vimeo, mp4 ... )']}
				</Label>
				<Input
					onChange={(event) => {
						debounceVideoUrlChange(event.currentTarget.value)
					}}
					defaultValue={videoUrl}
					className="mt-1"
					placeholder={T.pageSubmission['Video url...']}
					type="url"
					name="video-url"
					id="video-url"
				/>
			</div>
		)
	}

	const renderInputAudio = () => {
		let sp = 'mp3/mp4/Youtube'

		return (
			<div>
				<Label
					className="block capitalize"
					title={`Audio URL (${sp})`}
					htmlFor="audio-url"
				>{`Audio URL (${sp})`}</Label>
				<Input
					onChange={(event) => {
						debounceAudioUrlChange(event.currentTarget.value)
					}}
					defaultValue={audioUrl}
					className="mt-1"
					placeholder={T.pageSubmission['Audio url...']}
					type="url"
					name="audio-url"
					id="audio-url"
				/>
			</div>
		)
	}

	const renderAllowCommentSwitch = () => {
		return (
			<div className="flex items-center gap-3 sm:gap-8">
				<Label htmlFor="allow-comments" className="block capitalize">
					{T.pageSubmission['Allow comments']}
				</Label>
				<Switch
					checked={isAllowComments}
					onChange={setIsAllowComments}
					className={`${isAllowComments ? 'bg-primary-700' : 'bg-gray-700'} relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
					name="allow-comments"
					id="allow-comments"
				>
					<span className="sr-only">Allow comments</span>
					<span
						aria-hidden="true"
						className={`${
							isAllowComments
								? 'translate-x-9 rtl:-translate-x-9'
								: 'translate-x-0'
						} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
					/>
				</Switch>
			</div>
		)
	}

	const renderSelectPostStyle = () => {
		const selected = postStyleSelected
		const setSelected = setPostStyleSelected
		return (
			<div>
				<Label
					className="block capitalize"
					title={T.pageSubmission['Post style']}
				>
					{T.pageSubmission['Post style']}
				</Label>
				<Listbox
					value={selected}
					onChange={(value) => {
						setSelected(value)
					}}
				>
					<div className="relative z-10 mt-1">
						<ListboxButton as={'div'}>
							<Button pattern="third" fontSize="text-sm font-medium capitalize">
								{selected?.title || postStyles[0].title}
								<ChevronDownIcon
									className="-me-1 ms-2 h-4 w-4"
									aria-hidden="true"
								/>
							</Button>
						</ListboxButton>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<ListboxOptions
								anchor={{ to: 'bottom start', gap: '4px' }}
								className="absolute end-0 z-50 mt-2 max-h-96 w-52 overflow-auto rounded-xl bg-white py-1 text-sm text-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:text-neutral-200 dark:ring-neutral-700"
							>
								{postStyles.map((item, index: number) => (
									<ListboxOption
										key={index}
										className={
											'relative cursor-default select-none py-2 pe-4 ps-10 data-[focus]:bg-primary-50 data-[focus]:text-primary-700 dark:data-[focus]:bg-neutral-700 dark:data-[focus]:text-neutral-200'
										}
										value={item}
									>
										{({ selected }) => (
											<>
												<span
													className={`${
														selected ? 'font-medium' : 'font-normal'
													} block truncate capitalize`}
												>
													{item.title}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 start-0 flex items-center ps-3 text-primary-700 dark:text-neutral-200">
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</ListboxOption>
								))}
							</ListboxOptions>
						</Transition>
						<span>
							<span className="text-xs text-neutral-500 dark:text-neutral-400">
								{
									T.pageSubmission[
										'Choose the post style. Only applies to Standard format!'
									]
								}
							</span>
						</span>
					</div>
				</Listbox>
			</div>
		)
	}

	const renderShowSidebarSwitch = () => {
		return (
			<div className="flex items-center gap-3 sm:gap-8">
				<Label htmlFor="show-right-sidebar" className="block capitalize">
					{T.pageSubmission['Show right sidebar']}
				</Label>

				<Switch
					checked={isShowSidebar}
					onChange={setIsShowSidebar}
					className={`${isShowSidebar ? 'bg-primary-700' : 'bg-gray-700'} relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
					name="show-right-sidebar"
					id="show-right-sidebar"
				>
					<span className="sr-only">Show right sidebar</span>
					<span
						aria-hidden="true"
						className={`${
							isShowSidebar
								? 'translate-x-9 rtl:-translate-x-9'
								: 'translate-x-0'
						} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
					/>
				</Switch>
			</div>
		)
	}

	const checkOptionEnabel = (option: string) => {
		return (
			(NC_SITE_SETTINGS['submissions-settings']?.post_options?.filter(
				(item) => item?.name === option && item?.enable,
			)?.length || 0) > 0
		)
	}

	const renderContent = () => {
		return (
			<div className="">
				<div className="relative flex flex-col space-y-5 px-5 py-6">
					{renderExcerptTextarea()}

					{checkOptionEnabel('Schedule_Publication') &&
						renderSchedulePublication()}
					{checkOptionEnabel('Post_Format') && renderListBoxPostformat()}

					{checkOptionEnabel('Allow_Comments') && renderAllowCommentSwitch()}

					{postFormatsSelected === 'gallery' && renderUploadGallery()}

					{postFormatsSelected === 'video' && renderInputVideoUrl()}

					{postFormatsSelected === 'audio' && renderInputAudio()}

					{postFormatsSelected === 'standard' &&
						checkOptionEnabel('Post_Style') &&
						renderSelectPostStyle()}
					{checkOptionEnabel('Show_Right_Sidebar') && renderShowSidebarSwitch()}
				</div>
			</div>
		)
	}

	return (
		<>
			<NcModal
				containerClassName="flex"
				contentPaddingClass=""
				contentExtraClass="max-w-screen-md"
				renderContent={renderContent}
				renderTrigger={renderBtnOpenPopover}
				modalTitle="Post options"
				renderFooter={(closeModal) => {
					return (
						<div className="flex items-center justify-between">
							<Button
								pattern="link"
								onClick={() => {
									handleClickCancel()
									closeModal()
								}}
							>
								{T.Cancel}
							</Button>
							<ButtonPrimary
								type="submit"
								onClick={() => {
									handleClickApply()
									closeModal()
								}}
							>
								{T.Apply}
							</ButtonPrimary>
						</div>
					)
				}}
			/>
		</>
	)
}

export default PostOptionsBtn
