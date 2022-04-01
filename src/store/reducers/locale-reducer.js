import { TYPES } from '../actions/locale-actions';

const initialState = {
	records: [],
	temp: null
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case TYPES.CLEAN:
			return initialState;

		case TYPES.GET_ALL:
			return {
				...state,
				records: action.payload
			};

		case TYPES.GET_BY_ID:
			return {
				...state,
				temp: action.payload
			};

		case TYPES.CREATE:
			return {
				...state,
				records: state.records.concat(action.payload)
			};

		case TYPES.UPDATE:
			return {
				...state,
				records: state.records.map(locale =>
					locale.id === action.payload.id ? action.payload : locale
				)
			};

		case TYPES.DELETE:
			return {
				...state,
				records: state.records.filter(
					locale => locale.id !== action.payload.id
				)
			};

		default:
			return state;
	}
}
