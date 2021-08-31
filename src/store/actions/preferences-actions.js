export const TYPES = {
  CLEAN: 'CLEAN_PREFERENCES',
  SET_PREFERENCES: 'SET_PREFERENCES'
};

export const setPreferences = newPreferences => async (dispatch, getState) => {
  const response = {
    ...getState().preferences,
    ...newPreferences
  };
  dispatch({ type: TYPES.SET_PREFERENCES, payload: response });
};