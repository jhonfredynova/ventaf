import React, { useState } from 'react';
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
		<PostList
			isLoadingMore={isLoadingMore}
			hasMoreData={isThereMoreContents}
			authData={authData}
			translations={translations}
			posts={profilePosts}
			showEditBtns
			onLoadMore={onLoadMore}
		/>
	);
}
