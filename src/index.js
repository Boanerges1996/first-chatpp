import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import {createStore} from 'redux'
import rootReducer from './reducer/reducer'
import {Provider} from 'react-redux'

function saveToLocalStorage(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    } catch (err) {
      console.log(err);
    }
  }
  
function loadFromLocalStorage() {
    try {
    const serializedState = localStorage.getItem("state");
    if (serializedState == null) {
        return undefined;
    }
    return JSON.parse(serializedState);
    } catch (err) {
    console.log(err);
    return undefined;
    }
}

const persistState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(<Provider store={store}> <App /></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
