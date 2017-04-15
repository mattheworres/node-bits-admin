import {promiseReducer} from 'truefit-react-utils';
import {LOGIN} from '../actions';

export default promiseReducer(LOGIN, null, {
  FULFILLED: (state, payload) => payload.data,
});
