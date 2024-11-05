import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Error from '@/components/Error'
import Input from '@/components/Input/Input'
import Label from '@/components/Label/Label'
import LoginLayout from '@/container/login/LoginLayout'
import { IS_CHISNGHIAX_DEMO_SITE } from '@/contains/site-settings'
import { RootState } from '@/stores/store'
import getTrans from '@/utils/getTrans'
import { useLogin } from '@faustwp/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function Login() {
	const { isReady, isAuthenticated } = useSelector(
		(state: RootState) => state.viewer.authorizedUser,
	)
	const { login, loading, error, data } = useLogin()
	const router = useRouter()
	const T = getTrans()

	if (isReady && isAuthenticated) {
		router.replace('/')
	}

	const errorMessage = error?.message || data?.generateAuthorizationCode.error

	return (
		<LoginLayout
			isLoginPage
			rightBtn={{
				text: T['Sign up'],
				href: '/sign-up',
			}}
		>
			<>
				<div className="grid gap-6">
					<form
						onSubmit={(e) => {
							e.preventDefault()

							if (
								!e.currentTarget.username?.value ||
								!e.currentTarget.password?.value
							) {
								toast.error(T['Username and password are required!'], {
									position: 'bottom-center',
								})
								return
							}

							login(
								e.currentTarget.username.value,
								e.currentTarget.password.value,
								'/',
							)
						}}
					>
						<div className="grid gap-4">
							<div className="grid gap-1.5">
								<Label htmlFor="email">{T.Username}</Label>
								<Input
									id="username"
									name="username"
									placeholder={T['Email or username']}
									autoCapitalize="none"
									autoComplete="username"
									autoCorrect="off"
									type="text"
									required
									defaultValue={IS_CHISNGHIAX_DEMO_SITE ? 'demo' : undefined}
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

				<p className="text-center text-sm leading-6 text-neutral-500 dark:text-neutral-400">
					{T['Not a member?']}{' '}
					<Link
						href="/sign-up"
						className="text-primary-600 underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-400"
					>
						{T['Sign up']}
					</Link>
					<span className="mx-1">|</span>
					<Link
						href="/reset-password"
						className="text-primary-600 underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-400"
					>
						{T['Lost your password?']}
					</Link>
				</p>
			</>
		</LoginLayout>
	)
}
