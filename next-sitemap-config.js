module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_SERVER_URL,
	generateRobotsTxt: true,
	sitemapSize: 7000,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
			},
			{
				userAgent: '*',
				disallow: ['/admin/*', '/account/*'],
			},
		],
	},
};
