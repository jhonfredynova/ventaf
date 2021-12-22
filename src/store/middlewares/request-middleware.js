import axios from 'axios';
import { getAuthToken } from '../../utils/firebase-utils';

const request = () => next => async action => {
  const authToken = await getAuthToken();
  delete axios.defaults.headers.common.authorization;

  if (authToken) {
    axios.defaults.headers.common['authorization'] = `Bearer ${authToken}`;
  }

  return next(action);
};

export default request;
