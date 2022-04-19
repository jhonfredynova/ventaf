import axios from 'axios';
import config from '../../../config.json';

export const CONFIG_TYPES = {
	CLEAN: 'CLEAN_CONFIG',
	GET_CONFIG: 'GET_CONFIG',
	SYNC_CONFIG: 'SYNC_CONFIGURATION',
};

export const getConfiguration = (locale) => async (dispatch) => {
	const configData = { ...config };
	configData.translations = configData.translations[locale];
	dispatch({ type: CONFIG_TYPES.GET_CONFIG, payload: configData });
};

export const syncConfiguration = (locale) => async (dispatch) => {
	const configData = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/config/sync-config`);
	configData.translations = configData.data.translations[locale];
	dispatch({ type: CONFIG_TYPES.SYNC_CONFIG, payload: configData });
};
