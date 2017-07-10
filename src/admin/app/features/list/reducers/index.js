/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import deleteModal from './deleteModal.js';
import edit from './edit.js';
import search from './search.js';
import sort from './sort.js';

export default combineReducers({
  deleteModal,
  edit,
  search,
  sort,
});
