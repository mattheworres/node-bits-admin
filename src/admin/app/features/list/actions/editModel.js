export const EDIT_MODEL = 'EDIT_MODEL';

export const editModel = (schema, model) =>
({
  type: EDIT_MODEL,
  payload: {schema, model},
});
