import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserCard(props) {
	const { profile } = props;
	const profileData = profile || {};
	const photoURL = profileData.photoURL || '/anonymous.png';
	const username = profileData.displayName || profileData.username || profileData.email;

	if (!profile) {
		return null;
	}

	return (
		<Link href={`/${profile.username}`} passHref>
			<a href="passHref" className="btn btn-secondary btn-user-card">
				<Image src={photoURL} width={35} height={35} alt={username} />
				<span className="username">{username}</span>
				<span className="arrow-right">
					<i className="fas fa-arrow-right" />
				</span>
				<style jsx>{`
					.btn-user-card {
						margin-top: var(--spacer);
						margin-bottom: 5px;
						display: flex;
						align-items: center;

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
