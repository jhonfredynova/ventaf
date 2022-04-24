import { AUTH_TYPES } from './auth-actions';
import { CONFIG_TYPES } from './config-actions';
import { POST_TYPES } from './post-actions';

export const APP_TYPES = {
	CLEAN: 'CLEAN_STORE',
};

export const cleanStore = () => (dispatch) => {
	dispatch({ type: AUTH_TYPES.CLEAN });
	dispatch({ type: CONFIG_TYPES.CLEAN });
	dispatch({ type: POST_TYPES.CLEAN });
};
