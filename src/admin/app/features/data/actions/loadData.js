import _ from 'lodash';
import {get} from 'truefit-react-utils';

export const LOAD_DATA = 'LOAD_DATA';

export const loadData = (model, schema) => {
  const listKeys = schema ? _.filter(_.keys(schema.map), key => {
    const prop = schema.map[key];
    return prop.type === 'LIST';
  }) : [];

  const url = listKeys.length > 0 ? `${model}?expand=${listKeys.join(',')}` : model;

  return {
    type: LOAD_DATA,
    payload: get(url)
            .then(payload => ({
              model,
              data: payload.data,
            })),
  };
};
