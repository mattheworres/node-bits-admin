import {stateReducer} from 'truefit-react-utils';
import {PROMPT_FOR_DELETE, HIDE_DELETE_PROMPT} from '../actions';

const INITIAL = {shown: false, item: null};

export default stateReducer(INITIAL, {
  [PROMPT_FOR_DELETE]: (state, payload) => ({shown: true, item: payload}),
  [HIDE_DELETE_PROMPT]: () => INITIAL,
});
