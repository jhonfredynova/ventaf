import React from 'react';

export default function ProfileDetailsPublic(props) {
	const { translations, userProfile } = props;
	const profileUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${userProfile.username}`;
	const profileBio = userProfile.bio || translations.slogan;

	return (
		<>
			<h2>{userProfile.displayName}</h2>
			<p>{profileBio}</p>
			<p>
				<a href={profileUrl} target="_blank" rel="noreferrer">
					{profileUrl}
				</a>
			</p>

			<style jsx>{`
				h2,
				p {
					margin: 0;
					margin-bottom: 10px;
				}
			`}</style>
		</>
	);
}
