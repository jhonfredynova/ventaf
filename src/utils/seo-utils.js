import { toUrl } from './text-utils';

// eslint-disable-next-line import/prefer-default-export
export const getHomePageTitle = ({ query, translations }) => {
	let pageTitle = translations.slogan;

	if (query.search || query.tags) {
		pageTitle = [query.search || ''].join(' ').toLowerCase().trim();
	}

	return pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
};

export const getPostTitleSlug = (postData) => {
	const titleSlug = toUrl(
		postData.description.substring(0, 80).concat(', ').concat(postData.location.description)
	);

	return titleSlug;
};
