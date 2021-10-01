import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BREAKPOINTS } from '../../utils/style-utils';

export default function ProfileInfo(props) {
  const { authData } = useSelector(state => state.auth);
  const { translations, userProfile } = props;
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
        <img 
          src={userProfile.photoURL || '/anonymous.png'} 
          alt={userProfile.username} 
          width="150px" />
      </div>
      <div className="details">
        <h2>{userProfile.displayName || userProfile.username}</h2>
        {userProfile.bio && <p>{userProfile.bio}</p>}
        {userProfile.isEmailPublic && <p>{userProfile.email}</p>}
        {
          userProfile.website && 
          <p><a href={userProfile.website} rel="noreferrer" target="_blank">{userProfile.website}</a></p>
        }
        {
          isProfileOwner &&
          <div className="account-buttons">
            <Link href="/account/update-info"> 
              <a className="lnk-profile"><i className="fas fa-pen" /> {translations.editProfile}</a>
            </Link>
            <Link href="/account/change-password">
              <a className="lnk-password"><i className="fas fa-lock" />  {translations.changePassword}</a>
            </Link>
          </div>
        }
      </div>
      <style jsx>{`
        .profile-info {
          margin-bottom: calc(var(--spacer) * 2);

          .navigation {
            display: flex;
            align-items: center;
            margin-right: 15px;

            .btn-back {
              background: none;
              border: none;
              cursor: pointer;
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

            .account-buttons {
              text-align: center;
              margin-top: 10px;

              .lnk-profile,
              .lnk-password {
                display: block;
                cursor: pointer;
                padding: var(--spacer);
                text-decoration: none;
                background: var(--color-primary);
                border: 1px solid var(--color-primary);
                border-radius: var(--border-radius);
                color: white;
                margin-right: 5px;
              }

              .lnk-profile {
                margin-bottom: var(--spacer);
              }
            }
          }

          @media screen and (min-width: ${BREAKPOINTS.TABLET}) {
            display: flex;
            align-items: center;

            .details {
              flex-grow: 1;
              text-align: left;
              .account-buttons {
                text-align: left;

                .lnk-profile,
                .lnk-password {
                  display: inline-block;
                }
              }
            }
          }

        }
      `}</style>
    </header>
  );

}