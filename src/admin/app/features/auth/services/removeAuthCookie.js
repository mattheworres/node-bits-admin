import Cookies from 'universal-cookie';
import {COOKIE_AUTH} from '../constants';

const cookies = new Cookies();

export default () =>
  cookies.remove(COOKIE_AUTH);
