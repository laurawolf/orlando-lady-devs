import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return { ...state, name: action.payload.name, authenticated: true };
    case FETCH_USER_FAILURE:
      return { ...state, authenticated: false };
    default:
      return state;
  }
};
