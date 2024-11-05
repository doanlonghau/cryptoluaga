import React, { FC, useEffect } from 'react'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Error from '@/components/Error'
import Input from '@/components/Input/Input'
import Label from '@/components/Label/Label'
import Logo from '@/components/Logo/Logo'
import { IS_CHISNGHIAX_DEMO_SITE } from '@/contains/site-settings'
import { useLogin } from '@faustwp/core'
import Link from 'next/link'
import toast from 'react-hot-toast'
import getTrans from '@/utils/getTrans'
import { useLoginModal } from '@/hooks/useLoginModal'
import NcModal from '@/components/NcModal/NcModal'
import { useRouter } from 'next/router'

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = () => {
	const { login, loading, data, error } = useLogin()
	const { closeLoginModal, isOpen, urlRiderect } = useLoginModal()
	const router = useRouter()
	const T = getTrans()

	useEffect(() => {
		if (!!data?.generateAuthorizationCode.error) {
			// remove html tags on error message
			const errorMessage = data?.generateAuthorizationCode.error.replace(
				/<[^>]+>/g,
				'',
			)
			toast.error(errorMessage, {
				position: 'bottom-center',
			})
			return
		}

		if (!!data?.generateAuthorizationCode.code) {
			toast.success(
				'Login successful, system is reloading the page for synchronization...',
				{
					position: 'bottom-center',
					duration: 5000,
				},
			)

			// redirect to the urlRiderect or refresh
			!urlRiderect && router.reload()
			return
		}
	}, [data?.generateAuthorizationCode.code])

	const closeModal = closeLoginModal

	const errorMessage = error?.message || data?.generateAuthorizationCode.error

	const renderContent = () => {
		return (
			<div className="flex min-h-full flex-1 flex-col justify-center py-2.5 sm:p-6 lg:pb-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Logo className="block w-full text-center" imageClassName="mx-auto" />
					<div className="text-center">
						<h2 className="mt-5 text-center text-xl font-semibold leading-9 tracking-tight text-neutral-900 sm:mt-7 md:text-2xl dark:text-neutral-200">
							{T['Sign in to your account']}
						</h2>
						{IS_CHISNGHIAX_DEMO_SITE && (
							<span className="text-xs text-neutral-500 dark:text-neutral-400">
								Try sing in with a demo account (demo/demo).
							</span>
						)}
					</div>
				</div>
				<div className="mt-5 sm:mx-auto sm:mt-10 sm:w-full sm:max-w-sm">
					<div className="grid gap-6">
						<form
							onSubmit={(e) => {
								e.preventDefault()

								if (
									!e.currentTarget.username?.value ||
									!e.currentTarget.password?.value
								) {
									toast.error('Username and password are required!', {
										position: 'bottom-center',
									})
									return
								}

								login(
									e.currentTarget.username.value,
									e.currentTarget.password.value,
									urlRiderect,
								)
							}}
						>
							<div className="grid gap-4">
								<div className="grid gap-1.5">
									<Label htmlFor="email">{T.Username}</Label>
									<Input
										id="username"
										name="username"
										placeholder="Email or username"
										autoCapitalize="none"
										autoComplete="username"
										autoCorrect="off"
										type="text"
										required
										defaultValue={IS_CHISNGHIAX_DEMO_SITE ? 'demo' : undefined}
										autoFocus
										data-autofocus
									/>
								</div>
								<div className="grid gap-1.5">
									<Label htmlFor="password">{T.Password}</Label>
									<Input
										id="password"
										type="password"
										required
										defaultValue={IS_CHISNGHIAX_DEMO_SITE ? 'demo' : undefined}
									/>
								</div>
								<div className="grid">
									<ButtonPrimary loading={loading}>{T.Login}</ButtonPrimary>
									{!!errorMessage && (
										<Error className="mt-2 text-center" error={errorMessage} />
									)}
								</div>
							</div>
						</form>
					</div>

					<p className="mt-5 text-center text-sm leading-6 text-neutral-500 sm:mt-10 dark:text-neutral-400">
						{T['Not a member?']}?{' '}
						<Link
							href="/sign-up"
							className="font-medium text-primary-600 underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-400"
							onClick={closeModal}
						>
							{T['Sign up']}!
						</Link>
						<span className="mx-1">|</span>
						<Link
							href="/reset-password"
							className="font-medium text-primary-600 underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-400"
							onClick={closeModal}
						>
							{T['Lost your password?']}
						</Link>
					</p>
				</div>
			</div>
		)
	}

	const renderModalLogin = () => {
		return (
			<NcModal
				isOpenProp={isOpen}
				onCloseModal={closeLoginModal}
				contentExtraClass="max-w-screen-md"
				renderContent={renderContent}
				renderTrigger={() => null}
				modalTitle=""
			/>
		)
	}

	return renderModalLogin()
}

export default LoginModal
