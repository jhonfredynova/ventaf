import { TYPES } from '../actions/auth-actions';

const initialState = {
  authData: null,
  authLoaded: false,
  temp: null
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

    case TYPES.LOGOUT:
      return {
        ...state,
        authData: null
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
        temp: action.payload.messsage
      };

    case TYPES.RECOVER_PASSWORD:
      return {
        ...state,
        temp: action.payload
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
