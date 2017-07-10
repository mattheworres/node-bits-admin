import {stateReducer} from 'truefit-react-utils';
import {SORT_LIST, CLEAR_SORT} from '../actions';

const INITIAL_STATE = {};

export default stateReducer(INITIAL_STATE, {
  [SORT_LIST]: (state, payload) => payload,
  [CLEAR_SORT]: () => INITIAL_STATE,
});
