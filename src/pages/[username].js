import React from 'react';
import { useSelector } from 'react-redux';
import ProfileInfo from '../components/page-profile/profile-info';
import ProfileContents from '../components/page-profile/profile-contents';
import SEO from '../components/seo';
import { getProfileByUsername } from '../services/profiles-service';
import { getPosts } from '../services/posts-service';

export const getServerSideProps = async ({ query }) => {
	try {
		const profile = await getProfileByUsername(query.username);
		const profilePosts = await getPosts({ user: profile.id });

		return {
			props: {
				profile,
				profilePosts,
			},
		};
	} catch (error) {
		return { notFound: true };
	}
};

export default function ProfileView(props) {
	const { profile, profilePosts } = props;
	const authData = useSelector((state) => state.auth.authData);
	const { translations } = useSelector((state) => state.config);
	const pageTitle = profile && `${profile.displayName} (@${profile.username})`;
	const pageDescription = translations.slogan;

	if (!profile) {
		return null;
	}

	return (
		<main>
			<SEO title={pageTitle} description={pageDescription} imageUrl={profile.photoURL} />

			<h1 className="sr-only">{pageTitle}</h1>
			<article className="sr-only">{pageDescription}</article>
			<ProfileInfo translations={translations} userProfile={profile} />

			<h2>{translations.ads}</h2>
			<ProfileContents
				authData={authData}
				posts={profilePosts}
				translations={translations}
				userProfile={profile}
			/>

			<style jsx>{`
				main {
					max-width: var(--container-width);
					margin: 0 auto;
					padding: 15px;

					h2 {
						margin-bottom: 15px;
					}
				}
			`}</style>
		</main>
	);
}
