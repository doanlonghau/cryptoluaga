/** @type {import('next-sitemap').IConfig} */

const SITE_URL = process.env.NEXT_PUBLIC_URL

module.exports = {
	siteUrl: SITE_URL,
	generateRobotsTxt: true,
	exclude: ['/wordpress-sitemap.xml'],
	robotsTxtOptions: {
		additionalSitemaps: [
			`${SITE_URL}/wordpress-sitemap.xml`, // <==== Add here
		],
	},
	transform: (config, path) => {
		if (path.match(/\/\d{4}\/\d{2}\/\d{2}\/.*/gim)) {
			return null
		}

		return {
			loc: path,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
		}
	},
}
