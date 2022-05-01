import React from 'react';
import ReactGA from 'react-ga';
import ButtonCopyClipboard from '../button-copy-clipboard';

export default function ProfileDetailsPublic(props) {
	const { translations, userProfile } = props;
	const profileUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${userProfile.username}`;
	const profileBio = userProfile.bio || translations.slogan;

	const onShareProfileUrl = () => {
		ReactGA.event({
			category: 'Social',
			action: 'Copy profile url to clipboard',
			value: 2,
		});
	};

	return (
		<>
			<h2>{userProfile.displayName}</h2>

			<p>{profileBio}</p>
			<p>
				<ButtonCopyClipboard
					title={translations.shareViaUrl}
					translations={translations}
					value={profileUrl}
					onClick={onShareProfileUrl}
				>
					{profileUrl} <i className="fa fa-clipboard" aria-hidden="true" />
				</ButtonCopyClipboard>
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
