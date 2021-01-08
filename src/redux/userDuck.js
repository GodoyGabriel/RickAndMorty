// Constant
const LOGIN = "LOGIN";
let initialData = {
  loggedIn: false,
};
// Reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return state;
    default:
      return state;
  }
}

// Actions
