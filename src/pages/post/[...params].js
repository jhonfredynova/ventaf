import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import PhotoCarousel from "../../components/page-post-details/photo-carousel";
import MainInfo from "../../components/page-post-details/main-info";
import ContactInfo from "../../components/page-post-details/contact-info";
import BreadcumbBar from "../../components/page-post-details/breadcumb-bar";
import SEO from "../../components/seo";
import PostList from "../../components/post-list";
import {
	getRelatedContent,
	getPostById,
	updatePostViews
} from "../../store/actions/post-actions";
import { getProfileById } from "../../store/actions/profile-actions";
import { BREAKPOINTS } from "../../utils/style-utils";
import { initializeStore } from "../../store/store";
import { getConfiguration } from "../../store/actions/config-actions";

export const getServerSideProps = async ({ locale, query }) => {
	const store = initializeStore();
	const postId = query?.params?.[1];

	await Promise.all([
		store.dispatch(getConfiguration(locale)),
		store.dispatch(getPostById(postId))
	]);

	if (!store.getState().post.currentPost) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			initialReduxState: store.getState()
		}
	};
};

export default function PostDetails() {
	const store = useStore();
	const [sharingUrl, setSharingUrl] = useState("");
	const authData = useSelector(state => state.auth.authData);
	const { callingCodes, currencies, translations } = useSelector(
		state => state.config
	);
	const relatedContent = useSelector(state => state.post.relatedContent);
	const profiles = useSelector(state => state.profile.records);
	const postData = useSelector(state => state.post.currentPost);
	const userProfile = postData && profiles[postData.user];
	const pageTitle = (postData?.description || "")
		.trim()
		.substring(0, 80)
		.concat(", ")
		.concat(postData?.location?.description);

	useEffect(() => {
		store.dispatch(getProfileById(postData.user));
		store.dispatch(updatePostViews(postData.id));
		setSharingUrl(window.location.href);

		if (window.screen.width > parseInt(BREAKPOINTS.PHONE, 10)) {
			store.dispatch(getRelatedContent(postData.id));
		}
	}, [store, postData]);

	return (
		<main>
			<SEO
				title={pageTitle}
				description={postData.description}
				imageUrl={postData.photos[0]}
			/>
			<BreadcumbBar
				translations={translations}
				pageTitle={pageTitle}
				sharingUrl={sharingUrl}
			/>
			<h1>{pageTitle}</h1>
			<section className="ad-details">
				<div className="main-details">
					<PhotoCarousel
						autofocus
						bgColor="black"
						photos={postData.photos}
					/>
					<article>{postData.description}</article>
				</div>
				<div className="info">
					<MainInfo
						postData={postData}
						currencies={currencies}
						translations={translations}
						userProfile={userProfile}
					/>
					<ContactInfo
						postData={postData}
						callingCodes={callingCodes}
						pageTitle={pageTitle}
						sharingUrl={sharingUrl}
						translations={translations}
					/>
				</div>
			</section>
			{relatedContent.length > 0 && (
				<section className="related-content">
					<h2>{translations.relatedContent}</h2>
					<PostList
						isLoadingMore={false}
						hasMoreData={false}
						authData={authData}
						translations={translations}
						posts={relatedContent}
					/>
				</section>
			)}
			<style jsx>{`
				main {
					max-width: var(--container-width);
					margin: 0 auto;
					padding: calc(var(--spacer) * 2);

					h1 {
						display: none;
						font-size: 2.4rem;
						margin-bottom: var(--spacer);

						@media screen and (min-width: ${BREAKPOINTS.TABLET}) {
							font-size: 2.8rem;
						}
					}

					.ad-details {
						.main-details {
							margin-bottom: calc(var(--spacer) * 2);

							article {
								font-size: 1.8rem;
								margin-top: var(--spacer);
							}
						}

						.info {
							margin-bottom: calc(var(--spacer) * 2);
						}

						@media screen and (min-width: ${BREAKPOINTS.DESKTOP}) {
							display: flex;

							.main-details {
								flex-grow: 1;
								article {
									font-size: 2rem;
								}
							}

							.info {
								flex-shrink: 0;
								width: 300px;
								margin-left: var(--spacer);
							}
						}
					}

					.related-content {
						margin-top: var(--spacer);

						h2 {
							margin-bottom: var(--spacer);
						}
					}
				}
			`}</style>
		</main>
	);
}
