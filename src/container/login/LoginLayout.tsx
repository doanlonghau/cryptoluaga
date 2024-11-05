import Logo from '@/components/Logo/Logo'
import {
	IS_CHISNGHIAX_DEMO_SITE,
	NC_SITE_SETTINGS,
} from '@/contains/site-settings'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
	children: React.ReactNode
	rightBtn: {
		text: string
		href: string
	}
	isLoginPage?: boolean
	isSignUpPage?: boolean
	isResetPasswordPage?: boolean
}

const LoginLayout: FC<Props> = ({
	children,
	rightBtn,
	isLoginPage = true,
	isSignUpPage = false,
	isResetPasswordPage = false,
}) => {
	let blockquoteText = NC_SITE_SETTINGS.signIn_page?.blockquote?.text
	let blockquoteAuthor = NC_SITE_SETTINGS.signIn_page?.blockquote?.author
	let title = NC_SITE_SETTINGS.signIn_page?.title
	let subTitle = IS_CHISNGHIAX_DEMO_SITE
		? 'Try sing in with a demo account (demo/demo).'
		: NC_SITE_SETTINGS.signIn_page?.sub_title

	if (isSignUpPage) {
		blockquoteText = NC_SITE_SETTINGS.signUp_page?.blockquote?.text
		blockquoteAuthor = NC_SITE_SETTINGS.signUp_page?.blockquote?.author
		title = NC_SITE_SETTINGS.signUp_page?.title
		subTitle = NC_SITE_SETTINGS.signUp_page?.sub_title
	}

	if (isResetPasswordPage) {
		blockquoteText = NC_SITE_SETTINGS.resetPassword_page?.blockquote?.text
		blockquoteAuthor = NC_SITE_SETTINGS.resetPassword_page?.blockquote?.author
		title = NC_SITE_SETTINGS.resetPassword_page?.title
		subTitle = NC_SITE_SETTINGS.resetPassword_page?.sub_title
	}

	return (
		<div className="not-dark container relative h-[100vh] min-h-[600px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 xl:min-h-[800px] dark:bg-zinc-950">
			<Link
				className="focus-visible:ring-ring absolute right-4 top-4 hidden h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 md:right-8 md:top-8 lg:inline-flex dark:hover:bg-neutral-700"
				href={rightBtn.href}
			>
				{rightBtn.text}
			</Link>
			<div className="dark relative hidden h-full flex-col overflow-y-auto border-zinc-800 p-10 text-neutral-100 lg:flex dark:border-r">
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="dark relative z-20 flex items-center text-lg font-medium">
					<Logo />
				</div>
				<div className="relative z-20 mt-auto max-w-screen-sm">
					<blockquote className="space-y-2">
						<p className="text-lg">“{blockquoteText}”</p>
						<footer className="text-sm">{blockquoteAuthor}</footer>
					</blockquote>
				</div>
			</div>
			<div className="pb-8 pt-12 sm:py-8 lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-96 sm:space-y-10">
					<div className="flex flex-col text-center">
						<div className="relative z-20 flex items-center justify-center pb-10 text-lg font-medium lg:hidden">
							<Logo />
						</div>
						<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
						<p className="text-muted-foreground mt-2 text-sm">{subTitle}</p>
					</div>

					{children}
				</div>
			</div>
		</div>
	)
}

export default LoginLayout
