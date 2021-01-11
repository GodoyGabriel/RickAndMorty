import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import userReducer from './userDuck';
import charactersReducer, {getCharactersAction} from './charactersDuck';
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
  return store;
}