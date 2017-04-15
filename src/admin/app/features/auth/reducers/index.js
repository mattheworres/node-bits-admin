/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import loginInfo from './loginInfo.js';
import user from './user.js';

export default combineReducers({
  loginInfo,
  user,
});
