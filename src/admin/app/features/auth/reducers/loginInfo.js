import {promiseReducer} from 'truefit-react-utils';
import {LOGIN_INFO} from '../actions';

export default promiseReducer(LOGIN_INFO, null, {
  FULFILLED: (state, payload) => payload.data,
});
