import axios from 'axios';

const request = store => next => action => {
  const { auth } = store.getState();
  delete axios.defaults.headers.common.authorization;

  if (auth.token) {
    axios.defaults.headers.common.authorization = `Bearer ${auth.token}`;
  }

  return next(action);
};

export default request;
