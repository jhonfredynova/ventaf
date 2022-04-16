import axios from 'axios';
import { getServerSideSitemap } from 'next-sitemap';
import { getPostTitleSlug } from '../utils/seo-utils';

export const getServerSideProps = async (ctx) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/get-all`);
	const fields = response.data.map((post) => ({
		loc: `${process.env.NEXT_PUBLIC_SERVER_URL}/post/${getPostTitleSlug(post)}/${post.id}`,
		lastmod: new Date(post.createdAt).toISOString(),
		changefreq: 'daily',
		priority: 0.8,
	}));

	return getServerSideSitemap(ctx, fields);
};

export default function ServerSitemap() {}
