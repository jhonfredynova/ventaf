import { TYPES } from '../actions/config-actions';

const initialState = {
  callingCodes: [],
  countries: [],
  currencies: [],
  languages: [],
  translations: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;

    case TYPES.CLEAN:
      return initialState;

    case TYPES.GET_CONFIG:
    case TYPES.SYNC_CONFIG:
      return {
        ...state,
        ...action.payload
      };

  }
}
