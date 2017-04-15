import cookie from 'react-cookie';
import {COOKIE_AUTH} from '../constants';

export default (value, config = {}) =>
  cookie.save(COOKIE_AUTH, value, config);
