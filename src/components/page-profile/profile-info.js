import React from 'react';
import { useStore, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { logout } from '../../store/actions/auth-actions';

export default function ProfileInfo(props) {
  const store = useStore();
  const { authData } = useSelector(state => state.auth);
  const { translations, userProfile } = props;
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
          alt={userProfile.displayName} 
          width="150px" />
      </div>
      <div className="details">
        <h2>{userProfile.displayName}</h2>
        {userProfile.bio && <p>{userProfile.bio}</p>}
        {userProfile.isEmailPublic && <p>{userProfile.email}</p>}
        {
          userProfile.website && 
          <p><a href={userProfile.website} rel="noreferrer" target="_blank">{userProfile.website}</a></p>
        }
        {
          authData &&
          <div className="account-buttons">
            <Link href="/account/update-info">
              <a className="btn-profile">{translations.editProfile}</a>
            </Link>
            <button className="btn-logout" onClick={() => store.dispatch(logout())}>
              {translations['logout']}
            </button>
          </div>
        }
      </div>
      <style jsx>{`
        .profile-info {
          display: flex;
          align-items: center;
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
            }
          }

          .details {
            display: block;
            margin-left: 15px;

            h2 {
              margin-bottom: var(--spacer);
            }

            p {
              margin-bottom: 4px;
            }

            .account-buttons {
              display: flex;
              align-items: center;
              margin-top: 10px;

              .btn-profile,
              .btn-logout {
                cursor: pointer;
                padding: var(--spacer);
                text-decoration: none;
              }

              .btn-profile {
                background: var(--color-primary);
                border: 1px solid var(--color-primary);
                border-radius: var(--border-radius);
                color: white;
                margin-right: 5px;
              }

              .btn-logout {
                background: var(--color-alert);
                border: 1px solid var(--color-alert);
                border-radius: var(--border-radius);
                color: white;
              }
            }
          }
        }
      `}</style>
    </header>
  );

}