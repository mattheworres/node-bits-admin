import _ from 'lodash';
import {post, put} from 'truefit-react-utils';
import {referencesForModel} from '../services';
import {ONE_TO_MANY, MANY_TO_MANY} from '../../shared/constants';

export const SAVE_MODEL = 'SAVE_MODEL';

const saveTheModel = (schema, model) => {
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
  saveTheModel(schema, model)
    .then(response => {
      model.id = model.id ? model.id : response.data.id;

      // save the references
      const references = referencesForModel(schema);
      const referencesToSave = references.map(reference => {
        const logic = saveMap[reference.source.type];
        return logic ? logic(schema, model, reference) : null;
      }).filter(r => !_.isNull(r));

      Promise.all(referencesToSave)
      .then(() => {
        dispatch({
          type: SAVE_MODEL,
          payload: {
            model: schema.model,
            data: model,
          },
        });
      });
    });
};
