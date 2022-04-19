import { AUTH_TYPES } from './auth-actions';
import { CONFIG_TYPES } from './config-actions';
import { LOCALE_TYPES } from './locale-actions';
import { POST_TYPES } from './post-actions';
import { PROFILE_TYPES } from './profile-actions';

export const APP_TYPES = {
	CLEAN: 'CLEAN_STORE',
};

export const cleanStore = () => (dispatch) => {
	dispatch({ type: AUTH_TYPES.CLEAN });
	dispatch({ type: CONFIG_TYPES.CLEAN });
	dispatch({ type: LOCALE_TYPES.CLEAN });
	dispatch({ type: POST_TYPES.CLEAN });
	dispatch({ type: PROFILE_TYPES.CLEAN });
};
