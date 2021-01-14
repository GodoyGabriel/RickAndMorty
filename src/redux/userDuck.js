import { loginWithGoogle, signOutGoogle } from "../firebase";
import { retreiveFavsAction } from './charactersDuck';

// Constant
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOG_OUT = "LOG_OUT";

let initialData = {
  loggedIn: false,
  fetching: false,
};
// Reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, loggedIn: true, ...action.payload };
    case LOG_OUT:
      return { ...initialData };
    default:
      return state;
  }
}

// Actions
export const doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  return loginWithGoogle()
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      saveStorage(getState());
      retreiveFavsAction()(dispatch, getState);
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
    });
};

export const restoreSessionAction = () => (dispatch, storage) => {
  if (storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user,
    });
  }
};

export const logOutAction = () => (dispatch, getState) => {
  signOutGoogle();
  dispatch({
    type: LOG_OUT
  });
  localStorage.removeItem('storage');
};

// Aux
function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage);
}
