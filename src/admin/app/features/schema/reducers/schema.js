import {promiseReducer} from 'truefit-react-utils';
import {LOAD_SCHEMA} from '../actions';

export default promiseReducer(LOAD_SCHEMA, [], {
  FULFILLED: (state, payload) => payload.data,
});
