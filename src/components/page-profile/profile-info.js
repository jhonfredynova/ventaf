import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LoginMethods from "./login-methods";
import { BREAKPOINTS } from '../../utils/style-utils';
import { uploadProfilePhoto } from '../../store/actions/auth-actions';

export default function ProfileInfo(props) {
  const uploadInputPhoto = useRef(null);
  const { translations, userProfile } = props;
  const store = useStore();
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(userProfile.photoURL || '/anonymous.png');
  const [uploadError, setUploadError] = useState('');
  const { authData } = useSelector(state => state.auth);
  const router = useRouter();
  const isProfileOwner = (authData?.uid === userProfile.id);
  const identities = (authData?.providerData) || {};

  useEffect(() => {
    setProfilePhotoUrl(`${userProfile.photoURL}?${Date.now()}`);
  }, [userProfile.photoURL]);

  const onUploadPhoto = async event => {
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
          type='button'
          className="btn-back"
          title={translations.goBack}
          onClick={() => router.back()}>
          <i className="fas fa-arrow-left" />
        </button>
        <input
          ref={uploadInputPhoto}
          type="file"
          hidden
          onChange={onUploadPhoto} />
        {
          isProfileOwner &&
          <button
            type='button'
            className="btn-profile-menu"
            title={userProfile.username}
            onClick={() => uploadInputPhoto.current.click()}>
            {
              isUploadingPhoto &&
              <div className="loader"><i className="fas fa-spinner fa-spin fa-4x" title={translations.loading} /></div>
            }
            {
              !isUploadingPhoto &&
              <Image src={profilePhotoUrl} alt={userProfile.username} layout="fixed" width={150} height={150} />
            }
            {uploadError && <p className="error-msg">{uploadError}</p>}
          </button>
        }
        {
          !isProfileOwner &&
          <Image src={profilePhotoUrl} alt={userProfile.username} layout="fixed" width={150} height={150} />
        }
      </div>

      <div className="details">
        <h2>{userProfile.displayName || userProfile.username}</h2>
        {
          isProfileOwner &&
          <div className="profile-options">
            <LoginMethods
              identities={identities}
              translations={translations} />
            <Link href="/account/update-info">
              <a href="passHref" className='btn-edit-profile'>{translations.editProfile}</a>
            </Link>
          </div>
        }
        {userProfile.bio && <p>{userProfile.bio}</p>}
        {userProfile.isEmailPublic && <p>{userProfile.email}</p>}
        {
          userProfile.website && 
          <p><a href={userProfile.website} rel="noreferrer" target="_blank">{userProfile.website}</a></p>
        }
      </div>

      <style jsx>{`
        .profile-info {
          margin-bottom: calc(var(--spacer) * 3);

          .error-msg {
            color: var(--color-alert);
          }

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

            .btn-profile-menu {
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
              margin: 0 auto;
            }
          }

          .details {
            text-align: center;

            h2 {
              margin-bottom: var(--spacer);
            }

            p {
              margin-bottom: 4px;
            }

            .profile-options {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 8px;

              .btn-edit-profile {
                background: var(--color-secondary);
                border: 1px solid var(--color-border);
                border-radius: var(--spacer);
                color: var(--color-text);
                text-decoration: none;
                cursor: pointer;
                padding: var(--spacer);
              }
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