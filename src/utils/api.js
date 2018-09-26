import { AsyncStorage } from 'react-native';
import { MOBILE_FLASHCARDS_STORAGE_KEY } from '../constants/App';
import { formatDecks } from './_decks';


export const getDecks = async () => {
  try {
    return await AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY).then(formatDecks);
  } catch(error) {
    // Error get decks
    console.log("Error get decks");
  }
};

export const getDeck = () => {

};

export const saveDeckTitle = () => {

};

export const addCardToDeck = () => {

};
