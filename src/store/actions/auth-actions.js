import axios from 'axios';

export const TYPES = {
  CLEAN: 'CLEAN_AUTH',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  LOGIN_EMAIL: 'LOGIN_EMAIL',
  LOGIN_FACEBOOK: 'LOGIN_FACEBOOK',
  LOGIN_GOOGLE: 'LOGIN_GOOGLE',
  LOGOUT: 'LOGOUT',
  ME: 'ME',
  REGISTER: 'REGISTER',
  RECOVER_PASSWORD: 'RECOVER_PASSWORD',
  SET_TOKEN: 'SET_TOKEN',
  UPDATE_PHOTO: 'UPDATE_PROFILE_PHOTO',
};

export const changeUserPassword = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, data);
  dispatch({ type: TYPES.CHANGE_PASSWORD, payload: response.data.message });
};

export const loginEmail = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-email`, data);
  dispatch({ type: TYPES.LOGIN_EMAIL, payload: response.data });
  return response.data;
};

export const loginFacebook = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-facebook`, data);
  dispatch({ type: TYPES.LOGIN_FACEBOOK, payload: response.data });
  return response.data;
};

export const loginGoogle = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-google`, data);
  dispatch({ type: TYPES.LOGIN_GOOGLE, payload: response.data });
  return response.data;
};

export const logout = () => async dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: TYPES.LOGOUT, payload: null });
};

export const me = () => async dispatch => {
  try {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
    dispatch({ type: TYPES.ME, payload: response.data });
  } catch (e) {
    dispatch({ type: TYPES.ME, payload: null });
  }
};

export const register = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
  dispatch({ type: TYPES.REGISTER, payload: response.data });
};

export const recoverPassword = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/recover-password`, data);
  dispatch({ type: TYPES.RECOVER_PASSWORD, payload: response.data });
  return response.data;
};

export const setToken = token => async dispatch => {
  localStorage.token = token;
  dispatch({ type: TYPES.SET_TOKEN, payload: token });
};

export const uploadProfilePhoto = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/upload-photo`, data);
  dispatch({ type: TYPES.UPDATE_PHOTO, payload: response.data });
};