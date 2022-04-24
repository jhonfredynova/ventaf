import axios from 'axios';
import { getServerSideSitemap } from 'next-sitemap';
import { getPostTitleSlug } from '../utils/seo-utils';

export const getServerSideProps = async (ctx) => {
	const postResponse = await axios.get(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/get-all?limit=1000`
	);
	const profileResponse = await axios.get(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/profiles/get-all?limit=1000`
	);

	const postFields = postResponse.data.map((post) => ({
		loc: `${process.env.NEXT_PUBLIC_SERVER_URL}/post/${getPostTitleSlug(post)}/${post.id}`,
		lastmod: new Date(post.createdAt).toISOString(),
		changefreq: 'daily',
		priority: 0.8,
	}));

	const profileFields = profileResponse.data.map((profile) => ({
		loc: `${process.env.NEXT_PUBLIC_SERVER_URL}/${profile.username}`,
		lastmod: new Date(profile.createdAt).toISOString(),
		changefreq: 'daily',
		priority: 0.8,
	}));

	return getServerSideSitemap(ctx, postFields.concat(profileFields));
};

export default function ServerSitemap() {}
