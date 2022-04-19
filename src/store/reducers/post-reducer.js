import { POST_TYPES } from '../actions/post-actions';

const initialState = {
	currentPost: null,
	records: [],
	relatedContent: [],
	temp: null,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case POST_TYPES.CLEAN:
			return initialState;

		case POST_TYPES.GET_ALL:
			return {
				...state,
				records: action.payload,
			};

		case POST_TYPES.GET_MORE_POSTS:
			return {
				...state,
				records: state.records.concat(action.payload),
			};

		case POST_TYPES.GET_BY_ID:
			return {
				...state,
				currentPost: action.payload,
			};

		case POST_TYPES.GET_RELATED_CONTENT:
			return {
				...state,
				relatedContent: action.payload,
			};

		case POST_TYPES.CREATE:
			return {
				...state,
				temp: action.payload,
			};

		case POST_TYPES.UPDATE:
		case POST_TYPES.UPDATE_VIEWS:
			return {
				...state,
				temp: action.payload,
			};

		case POST_TYPES.DELETE:
			return {
				...state,
				temp: action.payload,
			};

		default:
			return state;
	}
}
