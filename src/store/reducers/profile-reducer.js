import { PROFILE_TYPES } from '../actions/profile-actions';

const initialState = {
	records: {},
	temp: null,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case PROFILE_TYPES.CLEAN:
			return initialState;

		case PROFILE_TYPES.CLEAN_PROFILE: {
			// eslint-disable-next-line no-param-reassign
			delete state.records[action.payload];
			return {
				...state,
				records: state.records,
			};
		}

		case PROFILE_TYPES.GET_ALL_ADS: {
			const { profileId, profileAds } = action.payload;
			return {
				...state,
				records: {
					...state.records,
					[profileId]: {
						...state.records[profileId],
						ads: profileAds,
					},
				},
			};
		}

		case PROFILE_TYPES.GET_MORE_ADS: {
			const { profileId, newAds } = action.payload;
			return {
				...state,
				records: {
					...state.records,
					[profileId]: {
						...state.records[profileId],
						ads: state.records[profileId].ads.concat(newAds),
					},
				},
			};
		}

		case PROFILE_TYPES.GET_BY_EMAIL:
			return {
				...state,
				temp: action.payload,
			};

		case PROFILE_TYPES.GET_BY_ID:
		case PROFILE_TYPES.GET_BY_USERNAME:
			return {
				...state,
				records: {
					...state.records,
					[action.payload.id]: action.payload,
				},
			};

		case PROFILE_TYPES.DELETE: {
			const { profileId, postId } = action.payload;
			return {
				...state,
				records: {
					[profileId]: {
						...state.records[profileId],
						ads: state.records[profileId].ads.filter((post) => post.id !== postId),
					},
				},
			};
		}

		default:
			return state;
	}
}
