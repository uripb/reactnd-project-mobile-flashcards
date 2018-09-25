import { AsyncStorage } from 'react-native';
import { MOBILE_FLASHCARDS_STORAGE_KEY } from '../constants/App';
import { formatDecks } from './_decks';


export const getDecks = () => {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY).then(formatDecks);
};

export const getDeck = () => {

};

export const saveDeckTitle = () => {

};

export const addCardToDeck = () => {

};
