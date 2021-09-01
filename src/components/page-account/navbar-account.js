import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NavbarAccount(props) {
  const { authData, translations } = props;
  const router = useRouter();
  const { pathname } = router;

  return (
    <ul>
      <li>
        <Link href="/account/update-info">
          <a className={pathname === '/account/update-info' && 'active'}>{translations.updateInfo}</a>
        </Link>
      </li>
      <li>
        <Link href="/account/change-password">
          <a className={pathname === '/account/change-password' && 'active'}>{translations.changePassword}</a>
        </Link>
      </li>
      {
        authData && authData.claims.includes('admin') &&
        <li>
          <Link href="/account/manage-locales"> 
            <a className={pathname === '/account/manage-locales' && 'active'}>{translations.translations}</a>
          </Link>
        </li>
      }
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;

          li {
            padding: var(--spacer);
            margin-bottom: calc(var(--spacer) * 2);

            :global(a) {
              text-decoration: none;
              padding: var(--spacer);
            }

            :global(a.active) {
              background-color: var(--color-primary);
              color: white;
              cursor: default;
            }
          }
        }  
      `}</style>
    </ul>
  );
}