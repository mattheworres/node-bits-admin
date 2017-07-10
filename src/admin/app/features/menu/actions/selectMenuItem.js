import {clearSort, clearSearch} from '../../list/actions';

export const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';

export const selectMenuItem = item => dispatch => {
  dispatch(clearSort());
  dispatch(clearSearch());

  dispatch({
    type: SELECT_MENU_ITEM,
    payload: item,
  });
};
