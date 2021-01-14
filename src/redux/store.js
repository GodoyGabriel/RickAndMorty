import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import userReducer, { restoreSessionAction } from './userDuck';
import charactersReducer, {getCharactersAction, retreiveFavsAction} from './charactersDuck';
import thunk from 'redux-thunk';

let rootReducer = combineReducers({
  user: userReducer,
  characters: charactersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
  let store = createStore(rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
  );

  // Llamo a la funcion que te devuelve una segunda funcion
  getCharactersAction()(store.dispatch, store.getState);
  const storage = JSON.parse(localStorage.getItem("storage"));
  restoreSessionAction()(store.dispatch, storage);
  retreiveFavsAction()(store.dispatch, storage);
  return store;
}