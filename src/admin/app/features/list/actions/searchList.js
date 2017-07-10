export const SEARCH_LIST = 'SEARCH_LIST';

export const searchList = (key, value) =>
({
  type: SEARCH_LIST,
  payload: {key, value},
});
