export const PROMPT_FOR_DELETE = 'PROMPT_FOR_DELETE';

export const promptForDelete = item =>
({
  type: PROMPT_FOR_DELETE,
  payload: item,
});
