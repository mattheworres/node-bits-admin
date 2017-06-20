import {stateReducer} from 'truefit-react-utils';
import {Map, List} from 'immutable';
import {LOAD_DATA, DELETE_MODEL, SAVE_MODEL} from '../actions';

export default stateReducer(Map(), {
  [`${LOAD_DATA}_FULFILLED`]: (state, payload) => state.set(payload.model, List(payload.data)),

  [SAVE_MODEL]: (state, payload) => {
    const index = state.get(payload.model).findIndex(model => model.id === payload.data.id);
    if (index === -1) {
      return state.updateIn([payload.model], list => list.push(payload.data));
    }

    return state.updateIn([payload.model, index], () => payload.data);
  },

  [`${DELETE_MODEL}_FULFILLED`]: (state, payload) =>
    state.updateIn([payload.model], list => list.filter(m => m.id !== payload.id)),
});
