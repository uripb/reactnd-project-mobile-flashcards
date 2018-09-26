import { ADD_CARD } from '../constants/ActionTypes';

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    payload: {
      deckId,
      card
    }
  };
}
