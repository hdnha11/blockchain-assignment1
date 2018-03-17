import { combineReducers } from 'redux';
import * as types from '../actions/types';

const all = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TICKET:
      return [...state, action.ticket];

    default:
      return state;
  }
};

const buyingTicket = (state = null, action) => {
  switch (action.type) {
    case types.PICK_NUMBER:
      return { number: action.number };

    case types.ADD_TICKET:
    case types.UNDO_PICK_NUMBER:
      return null;

    case types.ADD_TICKET_FAIL:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default combineReducers({
  all,
  buyingTicket,
});
