import axios from 'axios';
import { setUrlSearch } from '../../utils/request-utils';

export const TYPES = {
  CLEAN: 'CLEAN_PROFILES',
  CLEAN_PROFILE: 'CLEAN_PROFILE',
  GET_ALL_ADS: 'GET_ALL_PROFILE_ADS',
  GET_MORE_ADS: 'GET_MORE_PROFILE_ADS',
  GET_BY_EMAIL: 'GET_PROFILE_BY_EMAIL',
  GET_BY_ID: 'GET_PROFILE_BY_ID',
  GET_BY_USERNAME: 'GET_PROFILE_BY_USERNAME',
  DELETE: 'DELETE_PROFILE_AD'
};

export const cleanProfile = profileId => dispatch => {
  dispatch({ type: TYPES.CLEAN_PROFILE, payload: profileId });
};

export const getProfileAds = (profileId, filters) => async (dispatch, getState) => {
  let profile = getState().profile.records[profileId];
  let profileAds = (profile && profile.ads) || [];

  if (profileAds.length === 0) {
    profileAds = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/get-all${setUrlSearch({ ...filters, user: profileId })}`);
    profileAds = profileAds.data;
  }

  dispatch({ type: TYPES.GET_ALL_ADS, payload: { profileId, profileAds } });
};

export const getMoreProfileAds = (profileId, filters) => async dispatch => {
  const posts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/get-all${setUrlSearch({ ...filters, user: profileId })}`);
  dispatch({ type: TYPES.GET_MORE_ADS, payload: { profileId, newAds: posts.data } });
  return posts.data;
};

export const getProfileByEmail = email => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/get-profile-by-email?email=${email}`);
  dispatch({ type: TYPES.GET_BY_EMAIL, payload: response.data });
  return response.data;
};

export const getProfileById = userId => async (dispatch, getState) => {
  let profile = getState().profile.records[userId];

  if (!profile) {
    profile = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/get-profile-by-id?userId=${userId}`);
    profile = profile.data;
  }

  dispatch({ type: TYPES.GET_BY_ID, payload: profile });
};

export const getProfileByUsername = username => async (dispatch, getState) => {
  const profiles = getState().profile.records;
  let profile = Object
    .keys(profiles)
    .map(profileId => profiles[profileId])
    .find(profile => profile.username === username);

  if (!profile) {
    profile = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/get-profile-by-username?username=${username}`);
    profile = profile.data;
  }

  dispatch({ type: TYPES.GET_BY_USERNAME, payload: profile });
  return profile;
};

export const deleteProfileAd = (profileId, postId) => async dispatch => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/remove?postId=${postId}`);
  dispatch({ type: TYPES.DELETE, payload: { profileId, postId } });
};
