import { TYPES } from '../actions/auth-actions';

const initialState = {
  authData: null,
  authLoaded: false,
  temp: null,
  token: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;

    case TYPES.CLEAN:
      return initialState;

    case TYPES.CHANGE_PASSWORD:
      return {
        ...state,
        temp: action.payload
      };

    case TYPES.LOGIN_EMAIL:
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

    case TYPES.REGISTER:
      return {
        ...state,
        temp: action.payload.messsage,
        token: action.payload.token
      };

    case TYPES.RECOVER_PASSWORD:
      return {
        ...state,
        temp: action.payload
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

  }
}
