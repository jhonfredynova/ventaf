import axios from 'axios';
import { setUrlSearch } from '../../utils/request-utils';

export const TYPES = {  
  CLEAN: 'CLEAN_POSTS',
  GET_ALL: 'GET_ALL_POSTS',
  GET_BY_ID: 'GET_POST_BY_ID',
  CREATE: 'CREATE_POST',
  UPDATE: 'UPDATE_POST',
  DELETE: 'DELETE_POST'
};

export const getLocales = filters => async (dispatch, getState) => {
  let locales = getState().locale.records;

  if (locales.length === 0) {
    locales = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/locales/get-all${setUrlSearch(filters)}`);
    locales = locales.data;
  }

  dispatch({ type: TYPES.GET_ALL, payload: locales });
};

export const getLocaleById = localeId => async (dispatch, getState) => {
  let localeData = getState().locale.records.find(locale => locale.id === localeId);

  if (!localeData) {
    localeData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/locales/${localeData}`);
    localeData = localeData.data;
  }

  dispatch({ type: TYPES.GET_BY_ID, payload: localeData });
  return localeData;
};

export const createLocale = localeData => async dispatch => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/locales/create`, localeData);
  dispatch({ type: TYPES.CREATE, payload: response.data });
  return response.data;
};

export const updateLocale = (localeId, localeData) => async dispatch => {
  const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/locales/update?localeId${localeId}`, localeData);
  dispatch({ type: TYPES.UPDATE, payload: response.data });
};

export const deleteLocale = localeId => async dispatch => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/locales/remove?localeId=${localeId}`);
  dispatch({ type: TYPES.DELETE, payload: response.data });
};
