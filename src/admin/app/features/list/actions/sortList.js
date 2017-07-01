export const SORT_LIST = 'SORT_LIST';
export const sortList = (sortBy, sortDirection) =>
({
  type: SORT_LIST,
  payload: {sortBy, sortDirection},
});
