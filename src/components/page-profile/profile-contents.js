import React, { useState } from 'react';
import Image from 'next/image';
import { getPosts } from '../../services/posts-service';
import PostList from '../post-list';

export default function ProfileContents(props) {
	const { authData, translations, posts, userProfile } = props;
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [isThereMoreContents, setIsThereMoreContents] = useState(posts.length > 0);
	const [profilePosts, setProfilePosts] = useState(posts);

	const onLoadMore = async () => {
		setIsLoadingMore(true);
		const lastPostDate = profilePosts[profilePosts.length - 1].createdAt;
		const postsFilters = { user: userProfile.id, olderThan: lastPostDate };

		getPosts(postsFilters).then((newPosts) => {
			setProfilePosts(profilePosts.concat(newPosts));
			setIsThereMoreContents(newPosts.length > 0);
			setIsLoadingMore(false);
		});
	};

	return (
		<>
			{!isLoadingMore && posts.length === 0 && (
				<div className="no-posts">
					<h3>{translations.noPostsYet}</h3>
					<Image
						src="https://storage.googleapis.com/construccionytecnologia-f556c.appspot.com/cats.png"
						alt={translations.noPostsYet}
						width="600"
						height="400"
					/>
				</div>
			)}
			<PostList
				isLoadingMore={isLoadingMore}
				hasMoreData={isThereMoreContents}
				authData={authData}
				translations={translations}
				posts={profilePosts}
				showEditBtns
				onLoadMore={onLoadMore}
			/>

			<style jsx>{`
				.no-posts {
					text-align: center;

					h3 {
						font-size: 2.8rem;
						font-weight: normal;
					}
				}
			`}</style>
		</>
	);
}
