export const getPublicProfileData = userData => ({
	id: userData.id,
	isEmailPublic: userData.isEmailPublic,
	displayName: userData.displayName,
	email: userData.email,
	bio: userData.bio,
	website: userData.website,
	photoURL: userData.photoURL,
	username: userData.username
});

export const getUserProfileData = userData => ({
	createdAt: Date.now(),
	displayName: userData.displayName || userData.email.split('@')[0],
	...(userData.photoURL && { photoURL: userData.photoURL }),
	username: userData.email,
	email: userData.email,
	marketer: userData.marketer || 'organic'
});

export const validateExistUserEmail = async (authLibrary, email) => {
	let emailExist = null;

	try {
		emailExist = await authLibrary.getUserByEmail(email);
	} catch (e) {
		emailExist = null;
	}

	return emailExist;
};
