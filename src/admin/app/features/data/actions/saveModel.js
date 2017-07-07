import _ from 'lodash';
import {post, put} from 'truefit-react-utils';
import {referencesForModel} from '../services';
import {ONE_TO_MANY, MANY_TO_MANY, MEDIA} from '../../shared/constants';

export const SAVE_PROCESSING = 'SAVE_PROCESSING';
export const SAVE_FAILURE = 'SAVE_FAILURE';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';

const hasMedia = schema =>
  _.some(schema.map, value => value.type === MEDIA);

const saveTheModel = (schema, model) => {
  if (hasMedia(schema)) {
    const data = new FormData();
    _.forOwn(model, (value, prop) => {
      data.append(prop, value);
    });

    return post(schema.model, data, {'Content-Type': 'multipart/form-data'});
  }

  const method = model.id ? put : post;
  return method(schema.model, model);
};

const saveNtoM = (schema, model, reference) => post('update_references', {
  root: {
    model: schema.model,
    id: model.id,
  },
  data: model[reference.key],
  source: reference.source,
});

const saveMap = {
  [ONE_TO_MANY]: saveNtoM,
  [MANY_TO_MANY]: saveNtoM,
};

export const saveModel = (schema, model) => dispatch => {
  dispatch({type: SAVE_PROCESSING});

  saveTheModel(schema, model)
    .then(response => {
      model.id = model.id ? model.id : response.data.id;

      // save the references
      const references = referencesForModel(schema);
      const referencesToSave = references.map(reference => {
        const logic = saveMap[reference.source.type];
        return logic ? logic(schema, model, reference) : null;
      }).filter(r => !_.isNull(r));

      return Promise.all(referencesToSave)
      .then(() => {
        dispatch({
          type: SAVE_SUCCESS,
          payload: {
            model: schema.model,
            data: model,
          },
        });
      });
    })
    .catch(err => {
      dispatch({
        type: SAVE_FAILURE,
        payload: err.response.data,
      });
    });
};
