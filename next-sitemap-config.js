const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL;

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	sitemapSize: 7000,
	robotsTxtOptions: {
		policies: [
			{ userAgent: '*', allow: '/' },
			{ userAgent: '*', disallow: ['/admin', '/account'] },
		],
		additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
	},
};
