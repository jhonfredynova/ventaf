import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// middlewares
import requestMiddleware from './middlewares/request-middleware';
import thunkMiddleware from './middlewares/thunk-middleware';
// reducers
import appReducer from './reducers/app-reducer';
import authReducer from './reducers/auth-reducer';
import configReducer from './reducers/config-reducer';

const reducers = combineReducers({
	app: appReducer,
	auth: authReducer,
	config: configReducer,
});

const middlewares = composeWithDevTools(applyMiddleware(requestMiddleware, thunkMiddleware));

export default createStore(reducers, {}, middlewares);
