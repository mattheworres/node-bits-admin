import {stateReducer} from 'truefit-react-utils';
import {SORT_LIST} from '../actions';

export default stateReducer({}, {
  [SORT_LIST]: (state, payload) => payload,
});
