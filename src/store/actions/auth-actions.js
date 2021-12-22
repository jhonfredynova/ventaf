import axios from 'axios';
import { loginWithEmail, loginWithFacebook, loginWithGoogle, registerWithEmail, recoverUserPassword } from '../../utils/firebase-utils';

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
  const response = await loginWithEmail(data);
  dispatch({ type: TYPES.LOGIN_EMAIL, payload: response });
  return response;
};

export const loginFacebook = locale => async dispatch => {
  const response = await loginWithFacebook(locale);
  dispatch({ type: TYPES.LOGIN_FACEBOOK, payload: response });
  return response;
};

export const loginGoogle = locale => async dispatch => {
  const responseLogin = await loginWithGoogle(locale);
  const responseRegister = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, responseLogin);
  dispatch({ type: TYPES.LOGIN_GOOGLE, payload: responseRegister.data });
  return responseRegister.data;
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
  const userData = await registerWithEmail(data);
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, userData);
  await loginEmail(userData);
  dispatch({ type: TYPES.REGISTER });
};

export const recoverPassword = data => async dispatch => {
  const response = await recoverUserPassword(data);
  dispatch({ type: TYPES.RECOVER_PASSWORD, payload: response });
  return response;
};

export const uploadProfilePhoto = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/upload-photo`, data);
  dispatch({ type: TYPES.UPDATE_PHOTO, payload: response.data });
};