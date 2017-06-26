import {get} from 'truefit-react-utils';
import {referencesForModel} from '../services';

const buildUrl = (model, schema, select) => {
  const references = referencesForModel(schema);

  let expand = null;
  if (references.length > 0) {
    expand = `expand=${references.map(r => r.source.referenceField).join(',')}`;

    // TODO: probably need to build out the select for all the order and the key, display
  }

  let url = model;
  if (expand) {
    url = `${url}?${expand}`;
  }

  if (select) {
    url = `${url}${expand ? '&' : '?'}select=${select.join(',')}`;
  }

  return url;
};

export const LOAD_DATA = 'LOAD_DATA';
export const loadData = (model, schema, select) => ({
  type: LOAD_DATA,
  payload: get(buildUrl(model, schema, select))
            .then(payload => ({
              model,
              data: payload.data,
            })),
});
