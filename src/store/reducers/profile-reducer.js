import { TYPES } from '../actions/profile-actions';

const initialState = {
  records: {},
  temp: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;

    case TYPES.CLEAN:
      return initialState;

    case TYPES.CLEAN_PROFILE: {
      delete state.records[action.payload];
      return {
        ...state,
        records: state.records
      };
    }

    case TYPES.GET_ALL_ADS: {
      const { profileId, profileAds } = action.payload;
      return {
        ...state,
        records: {
          ...state.records,
          [profileId]: {
            ...state.records[profileId],
            ads: profileAds
          }
        }
      };
    }

    case TYPES.GET_MORE_ADS: {
      const { profileId, newAds } = action.payload;
      return {
        ...state,
        records: {
          ...state.records,
          [profileId]: {
            ...state.records[profileId],
            ads: state.records[profileId].ads.concat(newAds)
          }
        }
      };
    }

    case TYPES.GET_BY_EMAIL:
      return {
        ...state,
        temp: action.payload
      };
    
    case TYPES.GET_BY_ID:
    case TYPES.GET_BY_USERNAME:
      return {
        ...state,
        records: {
          ...state.records,
          [action.payload.id]: action.payload
        }
      };

    case TYPES.DELETE: {
      const { profileId, postId } = action.payload;
      return {
        ...state,
        records: {
          [profileId]: {
            ...state.records[profileId],
            ads: state.records[profileId].ads.filter(post => post.id !== postId)
          }
        }
      };
    }

  }
}
