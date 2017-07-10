import {stateReducer} from 'truefit-react-utils';
import {SEARCH_LIST, CLEAR_SEARCH} from '../actions';

const INITIAL_STATE = {};

export default stateReducer({}, {
  [SEARCH_LIST]: (state, payload) => ({
    ...state,
    [payload.key]: payload.value,
  }),
  [CLEAR_SEARCH]: () => INITIAL_STATE,
});
