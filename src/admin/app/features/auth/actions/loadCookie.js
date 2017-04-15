import {LOGIN} from './login';
import {readAuthCookie} from '../services';

export const loadCookie = () => { // eslint-disable-line
  const cookie = readAuthCookie();
  if (cookie) {
    return ({
      type: `${LOGIN}_FULFILLED`,
      payload: {data: cookie},
    });
  }

  return {type: ''};
};
