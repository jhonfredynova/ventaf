import { useMemo } from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
// middlewares
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import requestMiddleware from './middlewares/request-middleware';
import thunkMiddleware from './middlewares/thunk-middleware';
// reducers
import appReducer from './reducers/app-reducer';
import authReducer from './reducers/auth-reducer';
import configReducer from './reducers/config-reducer';
import localeReducer from './reducers/locale-reducer';
import postReducer from './reducers/post-reducer';
import profileReducer from './reducers/profile-reducer';
import userReducer from './reducers/user-reducer';

let store = null;
const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  config: configReducer,
  locale: localeReducer,
  post: postReducer,
  profile: profileReducer,
  user: userReducer
});
const middlewares = composeWithDevTools(applyMiddleware(requestMiddleware, thunkMiddleware));

const initStore = preloadedState => createStore(reducers, preloadedState, middlewares);

export const initializeStore = preloadedState => {
  let newStore = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state
  // Merge that state with the current state in the store, and create a new store
  if (preloadedState && store) {
    // delete auth because it is controlled on the client side
    // eslint-disable-next-line no-param-reassign
    delete preloadedState.auth;
    newStore = initStore({ ...store.getState(), ...preloadedState });
    store = null;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return newStore;
  }

  // Create the store once in the client
  if (!store) {
    store = newStore;
    return store;
  } 

  return newStore;
};

export const useStore = initialState => {
  const storeData = useMemo(() => initializeStore(initialState), [initialState]);
  return storeData;
};