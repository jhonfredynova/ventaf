import axios from 'axios';

export const TYPES = {
  CLEAN: 'CLEAN_AUTH',
  LOGIN_FACEBOOK: 'LOGIN_FACEBOOK',
  LOGIN_GOOGLE: 'LOGIN_GOOGLE',
  LOGOUT: 'LOGOUT',
  ME: 'ME',
  SET_TOKEN: 'SET_TOKEN',
  UPDATE_PHOTO: 'UPDATE_PROFILE_PHOTO',
};

export const loginFacebook = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-oauth`, data);
  dispatch({ type: TYPES.LOGIN_FACEBOOK, payload: response.data });
  return response.data;
};

export const loginGoogle = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-oauth`, data);
  dispatch({ type: TYPES.LOGIN_GOOGLE, payload: response.data });
  return response.data;
};

export const logout = () => async dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: TYPES.LOGOUT, payload: null });
};

export const me = () => async dispatch => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
    dispatch({ type: TYPES.ME, payload: response.data });
  } catch (e) {
    localStorage.removeItem('token');
    dispatch({ type: TYPES.ME, payload: null });
  }
};

export const setToken = token => async dispatch => {
  localStorage.token = token;
  dispatch({ type: TYPES.SET_TOKEN, payload: token });
};

export const uploadProfilePhoto = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/upload-photo`, data);
  dispatch({ type: TYPES.UPDATE_PHOTO, payload: response.data });
};