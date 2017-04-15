import {stateReducer} from 'truefit-react-utils';
import {SELECT_MENU_ITEM} from '../actions';

export default stateReducer(null, {
  [SELECT_MENU_ITEM]: (state, payload) => payload,
});
