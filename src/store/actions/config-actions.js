import axios from 'axios';
import config from '../../../config.json';

export const TYPES = {
  CLEAN: 'CLEAN_CONFIG',
  GET_CONFIG: 'GET_CONFIG',
  SYNC_CONFIG: 'SYNC_CONFIGURATION'
};

export const getConfiguration = () => async (dispatch, getState) => {
  const preferences = getState().preferences;
  const configData = { ...config };
  configData.translations = configData.translations[preferences.language];
  dispatch({ type: TYPES.GET_CONFIG, payload: configData });
};

export const syncConfiguration = data => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/config/sync-config`, data);
  dispatch({ type: TYPES.SYNC_CONFIG, payload: response.data });
};