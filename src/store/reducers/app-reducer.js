import { APP_TYPES } from '../actions/app-actions';

const initialState = null;

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case APP_TYPES.CLEAN:
			return initialState;

		default:
			return state;
	}
}
