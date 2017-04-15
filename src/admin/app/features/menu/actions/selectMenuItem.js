export const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';

export const selectMenuItem = item =>
({
  type: SELECT_MENU_ITEM,
  payload: item,
});
