import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import ProfileInfo from '../components/page-profile/profile-info';
import ProfileContents from '../components/page-profile/profile-contents';
import SEO from '../components/seo';
import { getProfileByUsername } from '../services/profiles-service';
import { getPosts } from '../services/posts-service';
import { updateData, uploadProfilePhoto } from '../store/actions/auth-actions';

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
	const store = useStore();
	const router = useRouter();
	const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
	const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
	const [profileData, setProfileData] = useState(profile);
	const [profileErrors, setProfileErrors] = useState({});
	const [uploadError, setUploadError] = useState('');
	const authData = useSelector((state) => state.auth.authData);
	const { translations } = useSelector((state) => state.config);
	const pageTitle = profileData && `${profileData.displayName} (@${profileData.username})`;
	const pageDescription = translations.slogan;

	const onUpdateProfile = async (userInfo) => {
		try {
			setIsUpdatingProfile(true);
			setProfileErrors({});
			const newProfileData = await store.dispatch(updateData(userInfo));
			setProfileData(newProfileData);
			setIsUpdatingProfile(false);

			if (newProfileData.username !== profileData.username) {
				router.push(`/${newProfileData.username}`);
			}
		} catch (error) {
			const { errors: serverErrors, code } = error?.response?.data || {};
			setProfileErrors({ ...serverErrors, general: code });
			setIsUpdatingProfile(false);
		}
	};

	const onUploadProfilePhoto = async (event) => {
		try {
			setIsUploadingPhoto(true);
			setUploadError('');
			const formData = new FormData();
			formData.append('id', authData.uid);
			formData.append('photo', event.target.files[0]);
			await store.dispatch(uploadProfilePhoto(formData));
			setIsUploadingPhoto(false);
		} catch (error) {
			const { code, message } = error?.response?.data || {};
			setUploadError(translations[code] || message);
			setIsUploadingPhoto(false);
		}
	};

	return (
		<main>
			<SEO title={pageTitle} description={pageDescription} imageUrl={profileData.photoURL} />

			<h1 className="sr-only">{pageTitle}</h1>
			<article className="sr-only">{pageDescription}</article>

			<ProfileInfo
				isUpdatingProfile={isUpdatingProfile}
				isUploadingPhoto={isUploadingPhoto}
				profileErrors={profileErrors}
				uploadError={uploadError}
				translations={translations}
				userProfile={profileData}
				onCancelUpdateProfile={() => setProfileErrors({})}
				onUpdateProfile={onUpdateProfile}
				onUploadProfilePhoto={onUploadProfilePhoto}
			/>

			<h2>{translations.ads}</h2>

			<ProfileContents
				authData={authData}
				posts={profilePosts}
				translations={translations}
				userProfile={profileData}
			/>

			<style jsx>{`
				main {
					max-width: var(--container-width);
					margin: 0 auto;
					padding: 15px;

					h2 {
						margin: 0;
						margin-bottom: var(--spacer);
					}
				}
			`}</style>
		</main>
	);
}
