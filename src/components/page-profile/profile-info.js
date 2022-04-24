import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LoginMethods from './login-methods';
// import EditableInput from './editable-input';
import { BREAKPOINTS } from '../../utils/style-utils';
import { uploadProfilePhoto } from '../../store/actions/auth-actions';

export default function ProfileInfo(props) {
	const uploadInputPhoto = useRef(null);
	const { translations, userProfile } = props;
	const store = useStore();
	// const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
	const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
	// const [profileErrors, setProfileErrors] = useState({});
	const [profilePhotoUrl, setProfilePhotoUrl] = useState(userProfile.photoURL || '/anonymous.png');
	const [uploadError, setUploadError] = useState('');
	const { authData } = useSelector((state) => state.auth);
	const router = useRouter();
	const isProfileOwner = authData?.uid === userProfile.id;
	const identities = authData?.providerData || {};

	useEffect(() => {
		if (authData?.uid === userProfile.id) {
			setProfilePhotoUrl(`${authData.profile.photoURL}?${Date.now()}`);
		}
	}, [authData, userProfile]);

	/*
	const onUpdateProfileData = async (userInfo) => {
		try {
			setIsUpdatingProfile(true);
			setProfileErrors({});
			await store.dispatch(updateData(userInfo));
			setIsUpdatingProfile(false);
		} catch (error) {
			const { errors: serverErrors, code } = error?.response?.data || {};
			setProfileErrors({ ...serverErrors, general: code });
			setIsUpdatingProfile(false);
		}
	};
	*/

	const onUploadPhoto = async (event) => {
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
				<input ref={uploadInputPhoto} type="file" hidden onChange={onUploadPhoto} />

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
				{/*
				<EditableInput
					isUpdating={isUpdatingProfile}
					isProfileOwner={isProfileOwner}
					elementTag="h2"
					error={translations[profileErrors.displayName]}
					inputType="textbox"
					translations={translations}
					value={userProfile.displayName}
					onUpdate={(displayName) => onUpdateProfileData({ ...userProfile, displayName })}
				/>
				<EditableInput
					isUpdating={isUpdatingProfile}
					isProfileOwner={isProfileOwner}
					elementTag="p"
					error={translations[profileErrors.bio]}
					inputType="textbox"
					translations={translations}
					placeholder={translations.enterDescriptionYourProfile}
					value={userProfile.bio}
					onUpdate={(bio) => onUpdateProfileData({ ...userProfile, bio })}
				/>
				*/}

				{userProfile.displayName && <h2>{userProfile.displayName}</h2>}
				{userProfile.bio && <p>{userProfile.bio}</p>}
				{isProfileOwner && userProfile.email && <p>{userProfile.email}</p>}

				{isProfileOwner && (
					<div className="profile-options">
						<LoginMethods identities={identities} translations={translations} />
					</div>
				)}
			</div>

			<style jsx>{`
				.profile-info {
					margin-bottom: calc(var(--spacer) * 3);

					.navigation {
						display: flex;
						align-items: center;
						margin-right: 15px;

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

						h2,
						p {
							margin: 0;
							margin-bottom: 5px;
						}

						.profile-options {
							display: flex;
							align-items: center;
							justify-content: center;
							margin-bottom: 8px;
						}
					}

					@media screen and (min-width: ${BREAKPOINTS.TABLET}) {
						display: flex;
						align-items: center;

						.navigation {
							flex-grow: 0;
							width: 190px;
						}

						.details {
							flex-grow: 1;
							flex-shrink: 0;
							text-align: left;
							margin-left: calc(var(--spacer) * 2);

							.profile-options {
								justify-content: flex-start;
							}
						}
					}
				}
			`}</style>
		</header>
	);
}
