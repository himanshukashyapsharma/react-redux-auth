import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';

import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import {AuthenticationReducer} from './reducers/authentication-reducer'
import {UsersReducer} from './reducers/users-reducer'

const reducers = combineReducers({
	authentication_store: AuthenticationReducer,
	users_store: UsersReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
