import { getPosts as getPostsServ, deletePost as deletePostServ } from '../../services/posts-service';
import {
	getProfileByEmail as getProfileByEmailServ,
	getProfileByUsername as getProfileByUsernameServ,
	getProfileById as getProfileByIdServ,
} from '../../services/profiles-service';

export const PROFILE_TYPES = {
	CLEAN: 'CLEAN_PROFILES',
	CLEAN_PROFILE: 'CLEAN_PROFILE',
	GET_ALL_ADS: 'GET_ALL_PROFILE_ADS',
	GET_MORE_ADS: 'GET_MORE_PROFILE_ADS',
	GET_BY_EMAIL: 'GET_PROFILE_BY_EMAIL',
	GET_BY_ID: 'GET_PROFILE_BY_ID',
	GET_BY_USERNAME: 'GET_PROFILE_BY_USERNAME',
	DELETE: 'DELETE_PROFILE_AD',
};

export const cleanProfile = (profileId) => (dispatch) => {
	dispatch({ type: PROFILE_TYPES.CLEAN_PROFILE, payload: profileId });
};

export const getProfileAds = (profileId, filters) => async (dispatch, getState) => {
	const profile = getState().profile.records[profileId];
	let profileAds = (profile && profile.ads) || [];

	if (profileAds.length === 0) {
		const profilePostFilters = { ...filters, user: profileId };
		profileAds = await getPostsServ(profilePostFilters);
	}

	dispatch({ type: PROFILE_TYPES.GET_ALL_ADS, payload: { profileId, profileAds } });
};

export const getMoreProfileAds = (profileId, filters) => async (dispatch) => {
	const profilePostFilters = { ...filters, user: profileId };
	const posts = await getPostsServ(profilePostFilters);

	dispatch({
		type: PROFILE_TYPES.GET_MORE_ADS,
		payload: { profileId, newAds: posts },
	});

	return posts;
};

export const getProfileByEmail = (email) => async (dispatch) => {
	const profileData = await getProfileByEmailServ(email);
	dispatch({ type: PROFILE_TYPES.GET_BY_EMAIL, payload: profileData });
	return profileData;
};

export const getProfileById = (userId) => async (dispatch, getState) => {
	let profile = getState().profile.records[userId];

	if (!profile) {
		profile = await getProfileByIdServ(userId);
	}

	dispatch({ type: PROFILE_TYPES.GET_BY_ID, payload: profile });
};

export const getProfileByUsername = (username) => async (dispatch, getState) => {
	const profiles = getState().profile.records;
	let profile = Object.keys(profiles)
		.map((profileId) => profiles[profileId])
		.find((profileData) => profileData.username === username);

	if (!profile) {
		profile = await getProfileByUsernameServ(username);
	}

	dispatch({ type: PROFILE_TYPES.GET_BY_USERNAME, payload: profile });
	return profile;
};

export const deleteProfileAd = (profileId, postId) => async (dispatch) => {
	await deletePostServ(postId);
	dispatch({ type: PROFILE_TYPES.DELETE, payload: { profileId, postId } });
};
