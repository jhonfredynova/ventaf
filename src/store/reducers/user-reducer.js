import { TYPES } from '../actions/user-actions';

const initialState = {
  records: [],
  temp: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;

    case TYPES.CLEAN:
      return initialState;

    case TYPES.GET_ALL:
      return {
        ...state,
        records: action.payload
      };

    case TYPES.GET_BY_ID:
      return {
        ...state,
        temp: action.payload
      };
    
    case TYPES.UPDATE:
      return {
        ...state,
        records: state.records.map(item => (item.id === action.payload.id ? action.payload : item)),
        temp: action.payload
      };

  }
}
