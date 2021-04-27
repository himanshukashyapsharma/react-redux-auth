import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import {UsersReducer} from './reducers/users-reducer'
import {AuthenticationReducer} from './reducers/authentication-reducer'

import App from './App';


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
