import { TYPES } from '../actions/user-actions';

const initialState = {
	records: [],
	temp: null,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case TYPES.CLEAN:
			return initialState;

		case TYPES.GET_ALL:
			return {
				...state,
				records: action.payload,
			};

		case TYPES.GET_BY_ID:
			return {
				...state,
				temp: action.payload,
			};

		default:
			return state;
	}
}
