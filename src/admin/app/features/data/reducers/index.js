/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import models from './models.js';
import saveProcess from './saveProcess.js';

export default combineReducers({
  models,
  saveProcess,
});
