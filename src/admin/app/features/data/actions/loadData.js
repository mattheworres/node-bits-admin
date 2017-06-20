import {get} from 'truefit-react-utils';
import {referencesForModel} from '../services';

export const LOAD_DATA = 'LOAD_DATA';
export const loadData = (model, schema) => {
  const references = referencesForModel(schema);
  const url = references.length > 0 ? `${model}?expand=${references.map(r => r.source.reference).join(',')}` : model;

  return {
    type: LOAD_DATA,
    payload: get(url)
            .then(payload => ({
              model,
              data: payload.data,
            })),
  };
};
