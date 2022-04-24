import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import PhotoCarousel from '../../components/page-post-details/photo-carousel';
import MainInfo from '../../components/page-post-details/main-info';
import ContactInfo from '../../components/page-post-details/contact-info';
import BreadcumbBar from '../../components/page-post-details/breadcumb-bar';
import SEO from '../../components/seo';
import PostList from '../../components/post-list';
import { getPostById, getRelatedContent, updatePostViews } from '../../services/posts-service';
import { getProfileById } from '../../services/profiles-service';
import { BREAKPOINTS } from '../../utils/style-utils';

export const getServerSideProps = async ({ query }) => {
	const postId = query?.params?.[1];
	const postData = await getPostById(postId);

	if (!postData) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			postData,
		},
	};
};

export default function PostDetails(props) {
	const { postData } = props;
	const store = useStore();
	const [sharingUrl, setSharingUrl] = useState('');
	const [profile, setProfile] = useState(null);
	const [relatedContent, setRelatedContent] = useState([]);
	const authData = useSelector((state) => state.auth.authData);
	const { callingCodes, currencies, translations } = useSelector((state) => state.config);
	const pageTitle = (postData?.description || '')
		.trim()
		.substring(0, 80)
		.concat(', ')
		.concat(postData?.location?.description);

	useEffect(() => {
		getProfileById(postData.user).then(setProfile);
		updatePostViews(postData.id);
		setSharingUrl(window.location.href);

		if (window.screen.width > parseInt(BREAKPOINTS.PHONE, 10)) {
			getRelatedContent(postData.id).then(setRelatedContent);
		}
	}, [store, postData]);

	return (
		<main>
			<SEO title={pageTitle} description={postData.description} imageUrl={postData.photos[0]} />

			<BreadcumbBar translations={translations} pageTitle={pageTitle} sharingUrl={sharingUrl} />
			<h1>{pageTitle}</h1>

			<section className="ad-details">
				<div className="photo-details">
					<PhotoCarousel autofocus bgColor="black" photos={postData.photos} />
				</div>
				<div className="info">
					<MainInfo
						postData={postData}
						currencies={currencies}
						translations={translations}
						userProfile={profile}
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
					}

					.ad-details {
						.photo-details {
							margin-bottom: calc(var(--spacer) * 2);
						}

						.info {
							margin-bottom: calc(var(--spacer) * 2);
						}
					}

					.related-content {
						margin-top: var(--spacer);

						h2 {
							margin-bottom: var(--spacer);
						}
					}

					@media screen and (min-width: ${BREAKPOINTS.TABLET}) {
						h1 {
							font-size: 2.8rem;
						}
					}

					@media screen and (min-width: ${BREAKPOINTS.DESKTOP}) {
						.ad-details {
							display: flex;

							.photo-details {
								flex: 2;
							}

							.info {
								flex: 1;
								width: 300px;
								margin-left: var(--spacer);
							}
						}
					}
				}
			`}</style>
		</main>
	);
}
