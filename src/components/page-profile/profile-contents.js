import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { getMoreProfileAds } from '../../store/actions/profile-actions';
import PostList from '../post-list';

export default function ProfileContents(props) {
	const { authData, translations, posts, userProfile } = props;
	const store = useStore();
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [isThereMoreContents, setIsThereMoreContents] = useState(
		posts.length > 0
	);

	const onLoadMore = async () => {
		setIsLoadingMore(true);
		const lastPostDate = posts[posts.length - 1].createdAt;
		const newContents = await store.dispatch(
			getMoreProfileAds(userProfile.id, { olderThan: lastPostDate })
		);
		setIsThereMoreContents(newContents.length > 0);
		setIsLoadingMore(false);
	};

	return (
		<PostList
			isLoadingMore={isLoadingMore}
			hasMoreData={isThereMoreContents}
			authData={authData}
			translations={translations}
			posts={posts}
			showEditBtns
			onLoadMore={onLoadMore}
		/>
	);
}
