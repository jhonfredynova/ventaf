import React from 'react';
import Link from 'next/link';

export default function UserCard(props) {
  const { profile } = props;
  const profileData = profile || {};
  const photoURL = (profileData.photoURL) || '/anonymous.png';
  const username = (profileData.displayName || profileData.username || profileData.email);

  if (!profile) {
    return null;
  }

  return (
    <Link href={`/${profile.username}`}>
      <a className="user-card">
        <img src={photoURL} width={40} alt={username} />
        <span className="text-truncate">{username}</span>
        <span className="arrow-right">
          <i className="fas fa-arrow-right"></i>
        </span>
        <style jsx>{`
          :global(.user-card) {
            background: var(--color-secondary);
            border: 1px solid var(--color-border);
            border-radius: var(--spacer);
            color: var(--color-text);
            margin-top: var(--spacer);
            margin-bottom: var(--spacer);
            padding: var(--spacer);
            display: flex;
            align-items: center;
            text-decoration: none;

            img {
              border-radius: 50%;
              margin-right: var(--spacer);
            }

            .arrow-right {
              margin-left: auto;
            }
          }
        `}</style>
      </a>
    </Link>
  );

}