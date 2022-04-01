import { TYPES } from '../actions/post-actions';

const initialState = {
	currentPost: null,
	records: [],
	relatedContent: [],
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

		case TYPES.GET_MORE_POSTS:
			return {
				...state,
				records: state.records.concat(action.payload)
			};

		case TYPES.GET_BY_ID:
			return {
				...state,
				currentPost: action.payload
			};

		case TYPES.GET_RELATED_CONTENT:
			return {
				...state,
				relatedContent: action.payload
			};

		case TYPES.CREATE:
			return {
				...state,
				temp: action.payload
			};

		case TYPES.UPDATE:
		case TYPES.UPDATE_VIEWS:
			return {
				...state,
				temp: action.payload
			};

		case TYPES.DELETE:
			return {
				...state,
				temp: action.payload
			};

		default:
			return state;
	}
}
