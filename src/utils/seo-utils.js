export const getHomePageTitle = ({ query, translations }) => {
  let pageTitle = translations['slogan'];

  if (query.location || query.search || query.tags) {
    pageTitle = [query.search || '']
      .concat(query.tags && translations[query.tags])
      .join(' ')
      .toLowerCase()
      .trim();
  }

  return pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
};