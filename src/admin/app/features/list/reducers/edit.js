import {stateReducer} from 'truefit-react-utils';
import {EDIT_MODEL, STOP_EDIT} from '../actions';

const INITIAL_STATE = {
  shown: false,
  model: null,
  schema: null,
};

export default stateReducer(INITIAL_STATE, {
  [EDIT_MODEL]: (state, payload) => ({shown: true, ...payload}),
  [STOP_EDIT]: () => INITIAL_STATE,
});
