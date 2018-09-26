import { AsyncStorage } from 'react-native';
import { MOBILE_FLASHCARDS_STORAGE_KEY } from '../constants/App';
import { formatDecks } from './_decks';


export const getDecks = async() => {
  return await AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY).then(formatDecks);
};

export const getDeck = async(deckId) => {
  return await AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY).then((decks) => (
    JSON.parse(decks)[deckId]
  ));
};

export const saveDeckTitle = async(deck) => {
  try {
    await AsyncStorage.mergeItem(MOBILE_FLASHCARDS_STORAGE_KEY, JSON.stringify({
      [deck.title]: deck,
    }));
    return deck;
  } catch(error) {
    // Error save deck title
    console.log("error save deck title");
    return Promise.reject();
  }
  return 
};

export const addCardToDeck = () => {

};
