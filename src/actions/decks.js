import { RECEIVE_DECKS } from '../constants/ActionTypes';

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}