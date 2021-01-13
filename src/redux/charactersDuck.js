import http from "axios";
import { updateDB } from '../firebase';

// constants
const initialData = {
  fetching: false,
  array: [],
  current: {},
  favorites: [],
};

const URL = "https://rickandmortyapi.com/api/character";

const GET_CHARACTERS = "GET_CHARACTERS";
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
const REMOVE_CHARACTER = "REMOVE_CHARACTER";
const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

// Reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: action.payload, fetching: false };
    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case REMOVE_CHARACTER:
      return { ...state, array: action.payload };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

// Actions (thunks)
export const addToFavoritesAction = () => (dispatch, getState) => {
  let { array, favorites } = getState().characters;
  let { uid } = getState().user;
  let character = array.shift();
  favorites.push(character);
  updateDB(favorites, uid);
  // For inmutability spread operator
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: {
      array: [...array],
      favorites: [...favorites],
    },
  });
};

export const removeCharacterActions = () => (dispatch, getState) => {
  let { array } = getState().characters;
  array.shift();
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array],
  });
};

export const getCharactersAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS,
  });
  return http
    .get(URL)
    .then((res) => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: err.response.message,
      });
    });
};
