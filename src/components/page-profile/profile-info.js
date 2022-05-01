import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ProfileDetailsAuthenticated from './profile-details-authenticated';
import ProfileDetailsPublic from './profile-details-public';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function ProfileInfo(props) {
	const {
		isUpdatingProfile,
		isUploadingPhoto,
		profileErrors,
		uploadError,
		translations,
		userProfile,
		onUpdateProfile,
		onUploadProfilePhoto,
	} = props;
	const uploadInputPhoto = useRef(null);
	const [profilePhotoUrl, setProfilePhotoUrl] = useState(userProfile.photoURL || '/anonymous.png');
	const { authData } = useSelector((state) => state.auth);
	const router = useRouter();
	const isProfileOwner = authData?.uid === userProfile.id;

	useEffect(() => {
		if (authData?.uid === userProfile.id) {
			setProfilePhotoUrl(`${authData.profile.photoURL}?${Date.now()}`);
		}
	}, [authData, userProfile]);

	if (!userProfile) {
		return null;
	}

	return (
		<header className="profile-info">
			<div className="navigation">
				<button
					type="button"
					className="btn-back"
					title={translations.goBack}
					onClick={() => router.back()}
				>
					<i className="fas fa-arrow-left" />
				</button>

				<input
					ref={uploadInputPhoto}
					accept="image/*"
					type="file"
					hidden
					onChange={onUploadProfilePhoto}
				/>

				{isProfileOwner && (
					<button
						type="button"
						className="btn-profile-menu"
						title={userProfile.username}
						onClick={() => uploadInputPhoto.current.click()}
					>
						{isUploadingPhoto && (
							<div className="loader">
								<i className="fas fa-spinner fa-spin fa-4x" title={translations.loading} />
							</div>
						)}
						{!isUploadingPhoto && (
							<Image
								src={profilePhotoUrl}
								alt={userProfile.username}
								layout="fixed"
								width={150}
								height={150}
							/>
						)}
						{uploadError && <p className="error-msg">{uploadError}</p>}
					</button>
				)}

				{!isProfileOwner && (
					<div className="profile-img-wrapper">
						<Image
							src={profilePhotoUrl}
							alt={userProfile.username}
							layout="fixed"
							width={150}
							height={150}
						/>
					</div>
				)}
			</div>

			<div className="details">
				{isProfileOwner ? (
					<ProfileDetailsAuthenticated
						isUpdatingProfile={isUpdatingProfile}
						authData={authData}
						errors={profileErrors}
						translations={translations}
						userProfile={userProfile}
						onUpdate={onUpdateProfile}
					/>
				) : (
					<ProfileDetailsPublic translations={translations} userProfile={userProfile} />
				)}
			</div>

			<style jsx>{`
				.profile-info {
					margin-bottom: calc(var(--spacer) * 3);

					.navigation {
						display: flex;
						align-items: center;

						.btn-back,
						.btn-profile-menu {
							background: none;
							border: none;
							cursor: pointer;
						}

						.btn-back {
							color: var(--color-text);
							padding: var(--spacer);
						}

						.btn-profile-menu,
						.profile-img-wrapper {
							margin: 0 auto;
						}

						.loader {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 150px;
							height: 150px;
						}

						:global(img) {
							border-radius: 50%;
						}
					}

					.details {
						text-align: center;
					}
				}

				@media screen and (min-width: ${BREAKPOINTS.TABLET}) {
					.profile-info {
						display: flex;
						align-items: center;

						.navigation {
							flex-grow: 0;
							margin-right: calc(var(--spacer) * 2);
							width: 190px;
						}

						.details {
							flex-grow: 1;
							flex-shrink: 0;
							text-align: left;
							margin-left: calc(var(--spacer) * 2);
						}
					}
				}
			`}</style>
		</header>
	);
}
