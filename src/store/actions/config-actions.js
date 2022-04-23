import { getConfig } from '../../services/config-service';

export const CONFIG_TYPES = {
	CLEAN: 'CLEAN_CONFIG',
	GET_CONFIG: 'GET_CONFIG',
};

export const getConfiguration = (locale) => async (dispatch) => {
	const configData = getConfig(locale);
	dispatch({ type: CONFIG_TYPES.GET_CONFIG, payload: configData });
};
