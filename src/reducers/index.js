import { RECEIVE_DECKS } from '../constants/ActionTypes';

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks;
    default :
      return state
  }
}

export default decks;