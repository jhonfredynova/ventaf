import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// middlewares
import requestMiddleware from './middlewares/request-middleware';
import thunkMiddleware from './middlewares/thunk-middleware';
// reducers
import appReducer from './reducers/app-reducer';
import authReducer from './reducers/auth-reducer';
import configReducer from './reducers/config-reducer';
import postReducer from './reducers/post-reducer';
import profileReducer from './reducers/profile-reducer';

const reducers = combineReducers({
	app: appReducer,
	auth: authReducer,
	config: configReducer,
	post: postReducer,
	profile: profileReducer,
});

const middlewares = composeWithDevTools(applyMiddleware(requestMiddleware, thunkMiddleware));

// eslint-disable-next-line import/prefer-default-export
export const initStore = (preloadedState) => createStore(reducers, preloadedState, middlewares);
