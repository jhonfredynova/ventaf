import { AUTH_TYPES } from '../actions/auth-actions';

const initialState = {
	authData: null,
	authLoaded: false,
	temp: null,
	token: null,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_TYPES.CLEAN:
			return initialState;

		case AUTH_TYPES.LOGIN_FACEBOOK:
		case AUTH_TYPES.LOGIN_GOOGLE:
			return {
				...state,
				token: action.payload.token,
			};

		case AUTH_TYPES.LOGOUT:
			return {
				...state,
				authData: null,
				token: null,
			};

		case AUTH_TYPES.ME:
			return {
				...state,
				authData: action.payload,
				authLoaded: true,
			};

		case AUTH_TYPES.SET_TOKEN:
			return {
				...state,
				token: action.payload,
			};

		case AUTH_TYPES.UPDATE_PHOTO:
			return {
				...state,
				authData: {
					...state.authData,
					photoURL: action.payload,
				},
			};

		case AUTH_TYPES.UPDATE:
			return {
				...state,
				state: action.payload,
			};

		default:
			return state;
	}
}
