import {httpDelete} from 'truefit-react-utils';

export const DELETE_MODEL = 'DELETE_MODEL';
export const deleteModel = (schema, id) =>
({
  type: DELETE_MODEL,
  payload: httpDelete(`${schema.model}/${id}`)
          .then(() => ({model: schema.model, id})),
});
