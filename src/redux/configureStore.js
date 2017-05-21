import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { devToolsEnhancer } from 'redux-devtools-extension';

import messagesReducer from './modules/messages';
import authReducer from './modules/auth';
import statsReducer from './modules/stats';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const reducer = combineReducers({
  messages: messagesReducer,
  auth: authReducer,
  stats: statsReducer
});

const configureStore = (initialState) =>
  createStoreWithMiddleware(reducer, initialState, devToolsEnhancer());

export default configureStore;