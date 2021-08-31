import { TYPES } from '../actions/app-actions'; 

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;

    case TYPES.CLEAN:
      return initialState;
      
  }
}
