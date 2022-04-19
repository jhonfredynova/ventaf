import { TYPES as CONFIG_TYPES } from './config-actions';
import { TYPES as POST_TYPES } from './post-actions';
import { TYPES as PROFILE_TYPES } from './profile-actions';

export const TYPES = {
	CLEAN: 'CLEANstore',
};

export const cleanStore = () => (dispatch) => {
	dispatch({ type: CONFIG_TYPES.CLEAN });
	dispatch({ type: POST_TYPES.CLEAN });
	dispatch({ type: PROFILE_TYPES.CLEAN });
};
