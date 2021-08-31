import axios from 'axios';

const request = store => next => action => {
  const { auth, preferences } = store.getState();
  delete axios.defaults.headers.common.authorization;

  if (auth.token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${auth.token}`;
  }

  if (preferences.currency) {
    axios.defaults.headers.common['accept-currency'] = preferences.currency;
  }

  if (preferences.language) {
    axios.defaults.headers.common['accept-language'] = preferences.language;
  }

  return next(action);
};

export default request;
