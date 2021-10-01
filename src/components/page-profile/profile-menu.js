import React, { useRef } from 'react';
import Link from 'next/link';

export default function ProfileMenu(props) {
  const { authData, translations, onUploadPhoto, onLogout, onClose } = props;
  const inputPhoto = useRef(null);

  return (
    <nav className="profile-menu">

      <ul>
        <li>
          <input
            ref={inputPhoto}
            type="file"
            hidden
            onChange={onUploadPhoto}>
          </input>
          <button className="item primary" onClick={() => inputPhoto.current.click()}>
            {translations.uploadPhoto}
          </button>
        </li>
        <li>
          <Link href="/account/change-password">
            <a className='item'>{translations.changePassword}</a>
          </Link>
        </li>
        <li>
          <Link href="/account/update-info">
            <a className='item'>{translations.updateInfo}</a>
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
          <button className="item last" onClick={onClose}>
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

              &.last {
                border-bottom: none;
              }
            }
          }

        }  
      `}</style>
      
    </nav>
  );

}