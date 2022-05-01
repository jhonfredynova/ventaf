import React from 'react';
import EditableInput from './editable-input';
import LoginMethods from './login-methods';

export default function ProfileDetailsAuthenticated(props) {
	const { isUpdatingProfile, authData, errors, translations, userProfile, onUpdate } = props;
	const identities = authData?.providerData || {};

	const onValidateUsername = (value) => {
		const clearedUsername = value.toLowerCase().replace(/[^a-z0-9-]/gi, '');
		return clearedUsername;
	};

	return (
		<>
			<EditableInput
				isRequired
				isUpdating={isUpdatingProfile}
				elementTag="h2"
				error={translations[errors.displayName]}
				inputType="textbox"
				translations={translations}
				value={userProfile.displayName}
				onUpdate={(displayName) => onUpdate({ ...userProfile, displayName })}
			/>

			<EditableInput
				isUpdating={isUpdatingProfile}
				elementTag="p"
				error={translations[errors.bio]}
				inputType="textbox"
				translations={translations}
				placeholder={translations.enterDescriptionYourProfile}
				value={userProfile.bio}
				onUpdate={(bio) => onUpdate({ ...userProfile, bio })}
			/>

			<EditableInput
				isRequired
				isUpdating={isUpdatingProfile}
				elementTag="p"
				error={translations[errors.username]}
				inputType="textbox"
				prefixValue={`${process.env.NEXT_PUBLIC_SERVER_URL}/`}
				translations={translations}
				value={userProfile.username}
				onValidateInput={onValidateUsername}
				onUpdate={(username) => onUpdate({ ...userProfile, username })}
			/>

			<p>{userProfile.email}</p>

			<div className="profile-options">
				<LoginMethods identities={identities} translations={translations} />
			</div>

			<style jsx>{`
				p {
					margin: 0;
					margin-bottom: 10px;
					word-break: break-all;
				}
			`}</style>
		</>
	);
}
