import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { useRouter } from 'next/router';
import PostTile from './post-tile';
import Lightbox from './lightbox';
import InfiniteScroll from './infinite-scroll';
import NoResults from './no-results';
import PostEditionBar from './post-edition-bar';
import { BREAKPOINTS } from '../utils/style-utils';
import {
	getProfileAds,
	deleteProfileAd,
} from '../store/actions/profile-actions';
import ConfirmationModal from './modals/confirmation-modal';
import AlertModal from './modals/alert-modal';

export default function HomeContents(props) {
	const {
		isLoading,
		hasMoreData,
		authData,
		translations,
		posts,
		showEditBtns,
		onLoadMore,
	} = props;
	const router = useRouter();
	const store = useStore();
	const [isDeletingPost, setIsDeletingPost] = useState(false);
	const [messageDeleteError, setMessageDeleteError] = useState('');
	const [postToDelete, setPostToDelete] = useState(null);
	const [showModalDeleteAd, setShowModalDeleteAd] = useState(false);
	const [showModalDeleteError, setShowModalDeleteError] = useState(false);

	const getDefaultNoResultMsg = (pathname) => {
		switch (pathname) {
			case '/[username]':
				return translations.youHaveNotPostAnyAd;

			default:
				return translations.noResults;
		}
	};

	const onDelete = async () => {
		try {
			setIsDeletingPost(true);
			await store.dispatch(
				deleteProfileAd(postToDelete.user, postToDelete.id)
			);
			store.dispatch(getProfileAds(postToDelete.user, {}));
			setIsDeletingPost(false);
			setPostToDelete(null);
			setShowModalDeleteAd(false);
		} catch (error) {
			const { code } = error?.response?.data || {};
			setMessageDeleteError(translations[code]);
			setPostToDelete(null);
			setIsDeletingPost(false);
			setShowModalDeleteAd(false);
			setShowModalDeleteError(true);
		}
	};

	return (
		<>
			{!isLoading && posts.length === 0 && (
				<NoResults
					message={getDefaultNoResultMsg(router.pathname)}
					translations={translations}
				/>
			)}
			<InfiniteScroll
				isLoading={isLoading}
				hasMoreData={hasMoreData}
				onLoadMore={onLoadMore}
			>
				<section className="posts-section">
					{posts.map((post) => (
						<div key={post.id} className="post-wrapper">
							{showEditBtns && authData?.uid === post.user && (
								<PostEditionBar
									isLoading={isLoading}
									translations={translations}
									data={post}
									onEdit={(postData) =>
										router.push(
											`/post/edit?postId=${postData.id}`
										)
									}
									onDelete={(postData) => {
										setPostToDelete(postData);
										setShowModalDeleteAd(true);
									}}
								/>
							)}
							<PostTile
								isLoading={isLoading}
								translations={translations}
								data={post}
							/>
						</div>
					))}
				</section>
			</InfiniteScroll>
			<Lightbox
				isOpen={showModalDeleteAd}
				onToggle={() => setShowModalDeleteAd(!showModalDeleteAd)}
			>
				<ConfirmationModal
					isLoading={isDeletingPost}
					title={translations.deleteAd}
					message={translations.deleteAdWarning}
					translations={translations}
					onAccept={onDelete}
					onCancel={() => setShowModalDeleteAd(!showModalDeleteAd)}
				/>
			</Lightbox>
			<Lightbox
				isOpen={showModalDeleteError}
				onToggle={() => setShowModalDeleteError(!showModalDeleteError)}
			>
				<AlertModal
					title={translations.error}
					message={messageDeleteError}
					translations={translations}
					onClose={() =>
						setShowModalDeleteError(!showModalDeleteError)
					}
				/>
			</Lightbox>
			<style jsx>{`
				.posts-section {
					display: grid;
					grid-template-columns: 1fr;
					gap: calc(var(--spacer) * 2);

					.post-wrapper {
						position: relative;

						:global(.post-edition-bar) {
							position: absolute;
							top: 0;
							right: 0;
							z-index: 1;
						}
					}

					@media screen and (min-width: ${BREAKPOINTS.TABLET}) {
						grid-template-columns: repeat(2, 1fr);
					}

					@media screen and (min-width: ${BREAKPOINTS.DESKTOP}) {
						grid-template-columns: repeat(3, 1fr);
					}

					@media screen and (min-width: ${BREAKPOINTS.DESKTOP_LG}) {
						grid-template-columns: repeat(4, 1fr);
					}
				}
			`}</style>
		</>
	);
}
