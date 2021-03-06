import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

let initialState = {
  user: {
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    "subscribed?": "",
  },
  bookmarks: []
}

let reducer = (state = initialState, action) => {

  switch (action.type) {
    case "ADD_USER":
      let user = action.payload
      return {
        ...state,
        user: user
      }

    case "ADD_BOOKMARK":
      let bookmark = action.payload
      return {
        ...state,
        bookmarks: [state.bookmarks, bookmark]
      }
      
    case "LOGOUT":
      console.log("Logging out")
      return{
        id: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        "subscribed?": "",
        bookmarks: []
      }

    default:
      return state
  }
}
let storeObj = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={storeObj}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
