import cookie from 'react-cookie';
import {COOKIE_AUTH} from '../constants';

export default () =>
  cookie.load(COOKIE_AUTH);
