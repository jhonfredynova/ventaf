import React from 'react';
import Link from 'next/link';

export default function ProfileMenu(props) {
  const { authData, translations, onLogout, onUploadPhoto, onClose } = props;

  return (
    <nav className="profile-menu">
      <ul>
        <li>
          <button className="item primary" onClick={onUploadPhoto}>
            {translations.uploadPhoto}
          </button>
        </li>
        <li>
          <Link href="/account/update-info">
            <a className='item'>{translations.editProfile}</a>
          </Link>
        </li>
        <li>
          <Link href="/account/change-password">
            <a className='item'>{translations.changePassword}</a>
          </Link>
        </li>
        {
          authData?.claims?.includes('admin') &&
          <li>
            <Link href="/account/manage-locales"> 
              <a className='item'>{translations.translations}</a>
            </Link>
          </li>
        }
        <li>
          <button className="item alert" onClick={onLogout}>
            {translations.logout}
          </button>
        </li>
        <li>
          <button className="item" onClick={onClose}>
            {translations.cancel}
          </button>
        </li>
      </ul>  
      <style jsx>{`
        .profile-menu {
          background-color: white;
          border-radius: var(--border-radius);
          text-align: center;
          max-width: 100%;
          width: 400px;

          ul {
            margin: 0;
            padding: 0;
            list-style: none;

            li > .item {
              display: block;
              border: none;
              border-bottom: 1px solid var(--border-color);
              background-color: transparent;
              color: var(--color-text);
              cursor: pointer;
              padding: var(--spacer);
              text-decoration: none;
              width: 100%;

              &.alert {
                color: var(--color-alert);
                font-weight: bold;
              }

              &.primary {
                color: var(--color-primary);
                font-weight: bold;
              }
            }
          }

        }  
      `}</style>
    </nav>
  );

}