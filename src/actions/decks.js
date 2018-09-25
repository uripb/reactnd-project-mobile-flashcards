import { RECEIVE_DECKS } from '../constants/ActionTypes';
import { createAction } from './utils';
import { getDecks } from '../utils/api';

/*export function receiveDecks (decks) {
  return (dispatch) => {
    return getDecks().then(
      response => dispatch(createAction(RECEIVE_DECKS, response))
    )
  };
}*/

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}