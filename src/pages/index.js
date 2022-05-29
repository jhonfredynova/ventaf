import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PostList from '../components/post-list';
import SEO from '../components/seo';
import { getHomePageTitle } from '../utils/seo-utils';
import { getPosts } from '../services/posts-service';

export const getServerSideProps = async ({ query }) => {
	const posts = await getPosts(query);

	return {
		props: {
			posts,
		},
	};
};

export default function Home(props) {
	const { posts: serverPosts } = props;
	const [isLoadingPosts, setIsLoadingPosts] = useState(false);
	const [hasMorePosts, setHasMorePosts] = useState(true);
	const [posts, setPosts] = useState(serverPosts);
	const router = useRouter();
	const { query } = router;
	const authData = useSelector((state) => state.auth.authData);
	const { translations } = useSelector((state) => state.config);
	const pageTitle = getHomePageTitle({ query, translations });
	const pageDescription = translations.slogan;

	const onLoadMorePosts = async () => {
		setIsLoadingPosts(true);
		const newQuery = { ...query };
		const lastPost = posts.length > 0 ? posts[posts.length - 1] : null;

		if (lastPost) {
			newQuery.olderThan = lastPost.createdAt;
		}

		const newPosts = await getPosts(newQuery);
		setHasMorePosts(newPosts.length > 0);
		setPosts(posts.concat(newPosts));
		setIsLoadingPosts(false);
	};

	useEffect(() => {
		setIsLoadingPosts(true);
		getPosts(query).then((newPosts) => {
			setPosts(newPosts);
			setIsLoadingPosts(false);
		});
	}, [query]);

	return (
		<main>
			<SEO title={pageTitle} description={pageDescription} />

			<h1 className="sr-only">{pageTitle}</h1>
			<article className="sr-only">{pageDescription}</article>

			{!isLoadingPosts && posts.length === 0 && (
				<div className="no-posts">
					<h2>{translations.noResults}</h2>
					<Image
						src="https://storage.googleapis.com/construccionytecnologia-f556c.appspot.com/no-results.svg"
						alt={translations.noResults}
						width="800"
						height="600"
					/>
				</div>
			)}

			<PostList
				isLoading={isLoadingPosts}
				hasMoreData={hasMorePosts}
				authData={authData}
				translations={translations}
				posts={posts}
				onLoadMore={onLoadMorePosts}
			/>

			<style jsx>{`
				main {
					min-height: 300px;
					max-width: var(--container-width);
					margin: 0 auto;
					padding: calc(var(--spacer) * 2);

					.no-posts {
						text-align: center;

						h2 {
							margin-bottom: 0;
						}
					}
				}
			`}</style>
		</main>
	);
}
