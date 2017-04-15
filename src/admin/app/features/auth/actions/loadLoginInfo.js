import axios from 'axios';
import {API_BASE_URL} from 'configs'; // eslint-disable-line

export const LOGIN_INFO = 'LOGIN_INFO';
export const loadLoginInfo = () =>
({
  type: LOGIN_INFO,
  payload: axios.get(`${API_BASE_URL.replace('api', 'admin')}login_info`),
});
