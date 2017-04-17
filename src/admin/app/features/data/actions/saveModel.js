import {post, put} from 'truefit-react-utils';

export const SAVE_MODEL = 'SAVE_MODEL';
export const saveModel = (schema, model) => {
  const method = model.id ? put : post;
  return {
    type: SAVE_MODEL,
    payload: method(schema.model, model)
            .then(response => ({
              model: schema.model,
              data: {
                ...model,
                id: method === put ? model.id : response.data[0],
              },
            })),
  };
};
