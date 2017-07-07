import {stateReducer} from 'truefit-react-utils';
import {SAVE_PROCESSING, SAVE_SUCCESS, SAVE_FAILURE, RESET_SAVE_PROCESS} from '../actions';
import {PROCESSING, SUCCESS, FAILURE} from '../../shared/constants';

export default stateReducer(null, {
  [SAVE_PROCESSING]: () => ({status: PROCESSING}),
  [SAVE_SUCCESS]: () => ({status: SUCCESS}),

  [SAVE_FAILURE]: (state, payload) => ({status: FAILURE, errors: payload}),

  [RESET_SAVE_PROCESS]: () => null,
});
