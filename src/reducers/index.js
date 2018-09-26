import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../constants/ActionTypes';

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks;
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck,
      }
    case ADD_CARD:
      const deck = state[action.payload.deckId];
      return {
        ...state,
        [deck.title]: {
          ...deck,
          questions: deck.questions.concat([action.payload.card]),
        }
      }
    default :
      return state
  }
}

export default decks;