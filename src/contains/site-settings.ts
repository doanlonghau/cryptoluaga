// import from file json
import siteSettingsJson from '../../site-settings.json'
import _ from 'lodash'

type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>
}

type PartialExcept<T, K extends keyof T> = RecursivePartial<T> & Pick<T, K>

export const NC_SITE_SETTINGS: RecursivePartial<typeof siteSettingsJson> =
	siteSettingsJson

export const IS_DEV = process.env.NODE_ENV === 'development'
export const IS_CHISNGHIAX_DEMO_SITE =
	process.env.NEXT_PUBLIC_IS_CHISNGHIAX_DEMO_SITE === 'true'
