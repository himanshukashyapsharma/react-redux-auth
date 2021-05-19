import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import storage from 'redux-persist/lib/storage'
import {  persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import {UsersReducer, UsersDataListReducer} from './reducers/users-reducer'
import {AuthenticationReducer} from './reducers/authentication-reducer'

import App from './App';

const datalistPersistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['users']
}

const reducers = combineReducers({
  authentication_store: AuthenticationReducer,
	users_store: UsersReducer,
	users_datalist_store: persistReducer(datalistPersistConfig, UsersDataListReducer),
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));

let persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
