// eslint-disable-next-line import/prefer-default-export
export const getHomePageTitle = ({ query, translations }) => {
	let pageTitle = translations.slogan;

	if (query.search || query.tags) {
		pageTitle = [query.search || '']
			.join(' ')
			.toLowerCase()
			.trim();
	}

	return pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
};
