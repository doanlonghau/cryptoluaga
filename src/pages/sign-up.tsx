import { gql } from '@/__generated__'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Error from '@/components/Error'
import Input from '@/components/Input/Input'
import Label from '@/components/Label/Label'
import LoginLayout from '@/container/login/LoginLayout'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'
import { RootState } from '@/stores/store'
import getTrans from '@/utils/getTrans'
import { useMutation } from '@apollo/client'
import { decode } from 'html-entities'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const T = getTrans()

export default function SignUp() {
	const [email, setEmail] = useState('')
	const [userName, setUsername] = useState('')
	const { isReady, isAuthenticated } = useSelector(
		(state: RootState) => state.viewer.authorizedUser,
	)
	const router = useRouter()

	const [mutationsendPasswordResetEmail, mutationSendPasswordResetEmailResult] =
		useMutation(
			gql(/* GraphQL */ `
				mutation mutationSendPasswordResetEmailOnSignUp(
					$username: String = ""
				) {
					sendPasswordResetEmail(input: { username: $username }) {
						clientMutationId
						success
					}
				}
			`),
			{
				onCompleted: data => {
					if (data?.sendPasswordResetEmail?.success) {
						toast.success(
							T['A password reset link has been sent to your email'],
							{
								position: 'bottom-center',
							},
						)
					} else {
						toast.error(T['Something went wrong'], {
							position: 'bottom-center',
						})
					}
				},
				onError: error => {
					toast.error(error.message, {
						position: 'bottom-center',
					})
				},
			},
		)

	const [mutationRegisterUser, mutationRegisterUserResult] = useMutation(
		gql(/* GraphQL */ `
			mutation SignUpPageMutationRegisterUser(
				$username: String! = ""
				$email: String
			) {
				registerUser(input: { username: $username, email: $email }) {
					clientMutationId
					user {
						id
						uri
						userId
					}
				}
			}
		`),
		{
			onCompleted: data => {
				console.log('User created successfully!', { data })

				if (data?.registerUser?.user?.id) {
					toast.success('User created successfully!', {
						position: 'bottom-center',
					})
					mutationsendPasswordResetEmail({
						variables: {
							username: userName,
						},
					})
					return
				}

				toast.error(T['Something went wrong while creating user account!'], {
					position: 'bottom-center',
				})
			},
			onError: error => {
				if (typeof error.message !== 'string') {
					toast.error(T['Something went wrong'], {
						position: 'bottom-center',
					})
					return
				}
				// remove HTML tags from error message
				const messDecoded = decode(error.message).replace(/<[^>]*>?/gm, '')
				toast.error(messDecoded, {
					position: 'bottom-center',
				})
			},
		},
	)

	if (isReady && isAuthenticated) {
		router.replace('/')
		return null
	}

	const handleRegister = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!email || !userName) {
			toast.error(T['Email and username are required!'], {
				position: 'bottom-center',
			})
			return
		}
		mutationRegisterUser({
			variables: {
				username: userName,
				email: email,
			},
		})
	}

	// const { loading, data, error, called } = mutationRegisterUserResult || mutationSendPasswordResetEmailResult;
	const loading =
		mutationRegisterUserResult.loading ||
		mutationSendPasswordResetEmailResult.loading
	const error =
		mutationRegisterUserResult.error ||
		mutationSendPasswordResetEmailResult.error

	const sendPasswordResetEmailSuccess =
		mutationSendPasswordResetEmailResult.data?.sendPasswordResetEmail?.success

	const renderForm = () => {
		return (
			<form onSubmit={handleRegister}>
				<div className="grid gap-4">
					<div className="grid gap-1.5">
						<Label htmlFor="username">{T.Username}</Label>
						<Input
							id="username"
							type="text"
							autoComplete="username"
							required
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div className="grid gap-1.5">
						<Label htmlFor="email">{T.Email}</Label>
						<Input
							id="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							type="email"
							required
							onChange={e => setEmail(e.target.value)}
						/>
					</div>

					<div className="grid pt-2">
						<ButtonPrimary loading={loading}>{T['Sign up']}</ButtonPrimary>

						{!!error?.message && (
							<Error className="mt-2 text-center" error={error.message} />
						)}
					</div>
				</div>
			</form>
		)
	}

	return (
		<LoginLayout
			isSignUpPage
			rightBtn={{
				text: T['Sign in'],
				href: '/login',
			}}
		>
			<>
				<div className="grid gap-6">
					{!sendPasswordResetEmailSuccess ? (
						renderForm()
					) : (
						<div className="rounded-xl border border-neutral-200 p-5 text-center text-sm leading-6 text-neutral-700 dark:border-neutral-700 dark:text-neutral-400">
							<p className="">
								{
									T[
										'Please check your email to complete the registration process'
									]
								}
								!{' '}
							</p>
							<br />
							<div>
								<Link
									href="/login"
									className="text-primary-600 underline underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-500"
								>
									{T['Sign in']}
								</Link>
								&nbsp; {T.or} &nbsp;
								<Link
									href="/"
									className="text-primary-600 underline underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-500"
								>
									{T['Back to home']}
								</Link>
							</div>
						</div>
					)}
				</div>

				<div>
					{NC_SITE_SETTINGS.privacy_policy_page ? (
						<p className="mb-3 text-center text-xs text-neutral-500">
							{T['By creating an account you agree with our']}{' '}
							<a
								className="font-medium underline"
								href={NC_SITE_SETTINGS.privacy_policy_page?.uri}
								target="_blank"
								rel="noopener noreferrer"
							>
								{T['Privacy Policy']}
							</a>
							.
						</p>
					) : null}

					<p className="text-center text-sm leading-6 text-neutral-600 dark:text-neutral-400">
						{T['Already have an account?']}{' '}
						<Link
							href="/login"
							className="text-primary-600 underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-500"
						>
							{T['Sign in']}!
						</Link>
					</p>
				</div>
			</>
		</LoginLayout>
	)
}
