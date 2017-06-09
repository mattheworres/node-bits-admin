import Cookies from 'universal-cookie';
import {COOKIE_AUTH} from '../constants';

const cookies = new Cookies();

export default (value, config = {}) =>
  cookies.set(COOKIE_AUTH, value, config);
