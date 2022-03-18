import { TYPES } from '../actions/auth-actions';

const initialState = {
  authData: null,
  authLoaded: false,
  temp: null,
  token: null
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {

    case TYPES.CLEAN:
      return initialState;

    case TYPES.LOGIN_FACEBOOK:
    case TYPES.LOGIN_GOOGLE:
      return {
        ...state,
        token: action.payload.token
      };

    case TYPES.LOGOUT:
      return {
        ...state,
        authData: null,
        token: null
      };

    case TYPES.ME:
      return {
        ...state,
        authData: action.payload,
        authLoaded: true
      };

    case TYPES.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    case TYPES.UPDATE_PHOTO:
      return {
        ...state,
        authData: {
          ...state.authData,
          photoURL: action.payload
        }
      };

    default:
      return state;

  }
}
