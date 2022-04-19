import { TYPES as AUTH_TYPES } from './auth-actions';
import { TYPES as CONFIG_TYPES } from './config-actions';
import { TYPES as LOCALE_TYPES } from './locale-actions';
import { TYPES as POST_TYPES } from './post-actions';
import { TYPES as PROFILE_TYPES } from './profile-actions';

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
