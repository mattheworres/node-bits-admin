import {stateReducer} from 'truefit-react-utils';
import {LOGIN, LOGOUT} from '../actions';

export default stateReducer(null, {
  [`${LOGIN}_FULFILLED`]: (state, payload) => payload.data,
  [LOGOUT]: () => null,
});
