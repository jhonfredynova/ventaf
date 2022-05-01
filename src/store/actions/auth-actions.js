import { getAuth, updateAuthData, uploadAuthProfilePhoto, loginOAuth } from '../../services/auth-service';

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
	const authData = await loginOAuth(data);
	dispatch({ type: AUTH_TYPES.LOGIN_FACEBOOK, payload: authData });
	return authData;
};

export const loginGoogle = (data) => async (dispatch) => {
	const authData = await loginOAuth(data);
	dispatch({ type: AUTH_TYPES.LOGIN_GOOGLE, payload: authData });
	return authData;
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem('token');
	dispatch({ type: AUTH_TYPES.LOGOUT, payload: null });
};

export const me = () => async (dispatch) => {
	try {
		const authData = await getAuth();
		dispatch({ type: AUTH_TYPES.ME, payload: authData });
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
	const authData = await updateAuthData(data);
	dispatch({ type: AUTH_TYPES.UPDATE, payload: authData });
	return authData;
};

export const uploadProfilePhoto = (data) => async (dispatch) => {
	const authData = await uploadAuthProfilePhoto(data);
	dispatch({ type: AUTH_TYPES.UPDATE_PHOTO, payload: authData });
};
