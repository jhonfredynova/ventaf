import axios from 'axios';
import { setUrlSearch } from '../../utils/request-utils';

export const TYPES = {
	CLEAN: 'CLEAN_USER',
	GET_ALL: 'GET_ALL_USERS',
	GET_BY_ID: 'GET_USER',
	UPDATE: 'UPDATE_USER',
};

export const getUsers = (query) => async (dispatch) => {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${setUrlSearch(query)}`
	);
	dispatch({ type: TYPES.GET_ALL, payload: response.data });
};

export const getUserById = (id) => async (dispatch) => {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}`);
	dispatch({ type: TYPES.GET_BY_ID, payload: response.data });
};
