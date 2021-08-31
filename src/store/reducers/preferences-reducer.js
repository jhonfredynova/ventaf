import { TYPES } from '../actions/preferences-actions';

const initialState = {
  currency: 'cop',
  dateFormat: 'dd/month/yyyy',
  language: 'es'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;

    case TYPES.CLEAN:
      return initialState;

    case TYPES.SET_PREFERENCES:
      return action.payload;

  }
}
