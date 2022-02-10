import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import Lightbox from '../../components/lightbox';
import LoginMethods from '../page-profile/login-methods';
import ProfileMenu from '../page-profile/profile-menu';
import { BREAKPOINTS } from '../../utils/style-utils';
import { uploadProfilePhoto, logout } from '../../store/actions/auth-actions';

export default function ProfileInfo(props) {
  const { translations, userProfile } = props;
  const store = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const { authData } = useSelector(state => state.auth);
  const router = useRouter();
  const isProfileOwner = (authData?.uid === userProfile.id);
  const identities = (authData?.providerData) || {};

  const onUploadPhoto = async event => {
    try {
      setIsMenuOpen(false);
      setIsUploadingPhoto(true);
      setUploadError('');
      let formData = new FormData();
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

  const onLogout = () => {
    store.dispatch(logout());
    setIsMenuOpen(false);
    router.push('/');
  };

  if (!userProfile) {
    return null;
  }

  return (
    <header className="profile-info">

      <div className="navigation">
        <button
          className="btn-back"
          title={translations.goBack}
          onClick={() => router.back()}>
          <i className="fas fa-arrow-left" />
        </button>
        {
          isProfileOwner &&
          <button
            className="btn-profile-menu"
            title={userProfile.username}
            onClick={() => setIsMenuOpen(true)}>
            {
              isUploadingPhoto &&
              <div className="loader"><i className="fas fa-spinner fa-spin fa-4x" title={translations.loading} /></div>
            }
            {
              !isUploadingPhoto &&
              <img src={userProfile.photoURL || '/anonymous.png'} alt={userProfile.username} />
            }
            {uploadError && <p className="error-msg">{uploadError}</p>}
          </button>
        }
        {
          !isProfileOwner &&
          <img src={userProfile.photoURL || '/anonymous.png'} alt={userProfile.username} />
        }
      </div>

      <div className="details">
        <h2>{userProfile.displayName || userProfile.username}</h2>
        {
          isProfileOwner &&
          <div className="profile-options">
            <LoginMethods
              identities={identities}
              translations={translations}>
            </LoginMethods>
            <button className="btn-profile-settings" onClick={() => setIsMenuOpen(true)}>
              <i className="fas fa-cog" />
              <span className="text">{translations.options}</span>
            </button>
          </div>
        }
        {userProfile.bio && <p>{userProfile.bio}</p>}
        {userProfile.isEmailPublic && <p>{userProfile.email}</p>}
        {
          userProfile.website && 
          <p><a href={userProfile.website} rel="noreferrer" target="_blank">{userProfile.website}</a></p>
        }
      </div>

      <Lightbox
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}>
        <ProfileMenu
          authData={authData}
          translations={translations}
          onUploadPhoto={onUploadPhoto}
          onLogout={onLogout}
          onClose={() => setIsMenuOpen(false)}>
        </ProfileMenu>
      </Lightbox>

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

            img {
              border-radius: 50%;
              margin: 0 auto;
              width: 150px;
              height: 150px;
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

              .btn-profile-settings {
                background: var(--color-secondary);
                border: 1px solid var(--color-border);
                border-radius: var(--spacer);
                cursor: pointer;
                padding: var(--spacer);

                .fas {
                  margin-right: 4px;
                }
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