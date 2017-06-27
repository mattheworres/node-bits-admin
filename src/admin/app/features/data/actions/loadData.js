import _ from 'lodash';
import {get} from 'truefit-react-utils';
import {referencesForModel} from '../services';
import {SELECT_MODES} from '../../shared/constants';

const buildSelect = (model, schema, override, references) => {
  if (override) {
    return override;
  }

  const fields = _.filter(schema.map, (field, key) => {
    field.key = key;
    return SELECT_MODES.includes(field.mode);
  });
  const relatedFields = _.flatMap(references, ({source}) =>
    [`${source.referenceField}.${source.referenceKey}`, `${source.referenceField}.${source.referenceDisplay}`]);

  const allFields = _.flatten([
    ...fields.map(field => field.key),
    ...relatedFields,
  ]);

  return allFields.join(',');
};

const buildExpand = (model, schema, references) =>
  `expand=${references.map(r => r.source.referenceField).join(',')}`;

const buildUrl = (model, schema, selectOverride) => {
  const allReferences = referencesForModel(schema);
  const references = allReferences.filter(r => SELECT_MODES.includes(r.mode));

  const select = buildSelect(model, schema, selectOverride, references);
  const expand = buildExpand(model, schema, references);

  let url = `${model}?`;
  if (expand) {
    url = `${url}${expand}`;
  }

  if (select) {
    url = `${url}${expand ? '&' : ''}select=${select}`;
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
