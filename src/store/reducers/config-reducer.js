import { CONFIG_TYPES } from '../actions/config-actions';

const initialState = {
	callingCodes: [],
	countries: [],
	currencies: [],
	languages: [],
	translations: {},
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case CONFIG_TYPES.CLEAN:
			return initialState;

		case CONFIG_TYPES.GET_CONFIG:
		case CONFIG_TYPES.SYNC_CONFIG:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
}
