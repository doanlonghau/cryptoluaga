import React from 'react'
import Link from 'next/link'
import MyImage from '../MyImage'
import { NC_SITE_SETTINGS } from '@/contains/site-settings'

export interface LogoProps {
	className?: string
	imageClassName?: string
}

const Logo: React.FC<LogoProps> = ({ className = '', imageClassName }) => {
	let logoSrc = NC_SITE_SETTINGS.site_info?.site_logo || ''
	let logoLightSrc =
		NC_SITE_SETTINGS.site_info?.site_logo_light || logoSrc || ''

	if (!logoLightSrc && !logoSrc) {
		return null
	}

	return (
		<Link
			href="/"
			className={`ttnc-logo inline-block flex-shrink-0 text-primary-600 ${className}`}
		>
			<MyImage
				className={'block w-12 sm:w-14 dark:hidden ' + imageClassName}
				src={logoSrc || ''}
				alt={'Logo'}
				width={56}
				height={56}
			/>
			<MyImage
				className={'hidden w-12 sm:w-14 dark:block ' + imageClassName}
				src={logoLightSrc || ''}
				alt={'Logo'}
				width={56}
				height={56}
			/>
		</Link>
	)
}

export default Logo
