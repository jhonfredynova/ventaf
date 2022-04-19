import axios from 'axios';

export const AUTH_TYPES = {
	CLEAN: 'CLEAN_AUTH',
	LOGIN_FACEBOOK: 'LOGIN_FACEBOOK',
	LOGIN_GOOGLE: 'LOGIN_GOOGLE',
	LOGOUT: 'LOGOUT',
	ME: 'ME',
	SET_TOKEN: 'SET_TOKEN',
	UPDATE: 'UPDATE_USER',
	UPDATE_PHOTO: 'UPDATE_USER_PHOTO',
};

export const loginFacebook = (data) => async (dispatch) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login-oauth`, data);
	dispatch({ type: AUTH_TYPES.LOGIN_FACEBOOK, payload: response.data });
	return response.data;
};

export const loginGoogle = (data) => async (dispatch) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login-oauth`, data);
	dispatch({ type: AUTH_TYPES.LOGIN_GOOGLE, payload: response.data });
	return response.data;
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem('token');
	dispatch({ type: AUTH_TYPES.LOGOUT, payload: null });
};

export const me = () => async (dispatch) => {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/me`);
		dispatch({ type: AUTH_TYPES.ME, payload: response.data });
	} catch (e) {
		localStorage.removeItem('token');
		dispatch({ type: AUTH_TYPES.ME, payload: null });
	}
};

export const setToken = (token) => async (dispatch) => {
	localStorage.token = token;
	dispatch({ type: AUTH_TYPES.SET_TOKEN, payload: token });
};

export const updateData = (data) => async (dispatch) => {
	const response = await axios.patch(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/update?userId=${data.id}`,
		data
	);
	dispatch({ type: AUTH_TYPES.UPDATE, payload: response.data });
};

export const uploadProfilePhoto = (data) => async (dispatch) => {
	const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/upload-photo`, data);
	dispatch({ type: AUTH_TYPES.UPDATE_PHOTO, payload: response.data });
};
