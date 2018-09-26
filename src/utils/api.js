import { AsyncStorage } from 'react-native';
import { MOBILE_FLASHCARDS_STORAGE_KEY } from '../constants/App';
import { formatDecks } from './_decks';

export const getDecks = async () => {
  return await AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY).then(
    formatDecks
  );
};

export const getDeck = async deckId => {
  return await AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY).then(
    decks => JSON.parse(decks)[deckId]
  );
};

export const saveDeckTitle = async deck => {
  try {
    await AsyncStorage.mergeItem(
      MOBILE_FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [deck.title]: deck
      })
    );
    return deck;
  } catch (error) {
    // Error save deck title
    console.log('error save deck title');
    return Promise.reject();
  }
};

export const addCardToDeck = async (deckId, card) => {
  try {
    return getDecks().then(decks => {
      const deckData = decks[deckId];
      deckData.questions.push(card);

      decks = {
        ...decks,
        [deckId]: deckData
      };

      return AsyncStorage.setItem(
        MOBILE_FLASHCARDS_STORAGE_KEY,
        JSON.stringify(decks)
      );
    });
  } catch (error) {
    // Error add card to deck
    console.log('error add card to deck');
    return Promise.reject();
  }
};
