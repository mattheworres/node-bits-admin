import {configureHttp as httpConfigure} from 'truefit-react-utils';
import {API_BASE_URL} from 'configs'; // eslint-disable-line
import {userSelector} from '../features/auth/selectors';

const DEFAULT_CONFIG = {
  baseURL: API_BASE_URL,
};

export const configureHttp = store => httpConfigure(() => {
  const user = userSelector(store.getState());
  if (user) {
    return {
      ...DEFAULT_CONFIG,
      headers: {
        Authorization: user.token,
      },
    };
  }

  return DEFAULT_CONFIG;
});
