import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Lightbox from '../../components/lightbox';
import ProfileMenu from '../page-profile/profile-menu';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function ProfileInfo(props) {
  const { translations, userProfile } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authData } = useSelector(state => state.auth);
  const isProfileOwner = (authData?.uid === userProfile.id);
  const router = useRouter();

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
            <img src={userProfile.photoURL || '/anonymous.png'} alt={userProfile.username} width="150px" />
          </button>
        }
        {
          !isProfileOwner &&
          <img 
            src={userProfile.photoURL || '/anonymous.png'} 
            alt={userProfile.username} 
            width="150px" />
        }
      </div>

      <div className="details">
        <h2>{userProfile.displayName || userProfile.username}</h2>
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
          onClose={() => setIsMenuOpen(false)}>
        </ProfileMenu>
      </Lightbox>

      <style jsx>{`
        .profile-info {
          margin-bottom: calc(var(--spacer) * 2);

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

            img {
              border-radius: 50%;
              margin: 0 auto;
            }
          }

          .details {
            text-align: center;
            margin-left: 15px;

            h2 {
              margin-bottom: var(--spacer);
            }

            p {
              margin-bottom: 4px;
            }
          }

          @media screen and (min-width: ${BREAKPOINTS.TABLET}) {
            display: flex;
            align-items: center;

            .details {
              flex-grow: 1;
              text-align: left;
            }
          }

        }
      `}</style>
    </header>
  );

}