import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserCard(props) {
	const { profile } = props;
	const profileData = profile || {};
	const photoURL = profileData.photoURL || '/anonymous.png';
	const username =
		profileData.displayName || profileData.username || profileData.email;

	if (!profile) {
		return null;
	}

	return (
		<Link href={`/${profile.username}`}>
			<a href="passHref" className="user-card">
				<Image src={photoURL} width={35} height={35} alt={username} />
				<span className="username">{username}</span>
				<span className="arrow-right">
					<i className="fas fa-arrow-right" />
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

						:global(img) {
							border-radius: 50%;
						}

						.username {
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							margin-left: var(--spacer);
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
