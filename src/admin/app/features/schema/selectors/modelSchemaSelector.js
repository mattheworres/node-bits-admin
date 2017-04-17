import _ from 'lodash';
import {createSelector} from 'reselect';

import allSchemaSelector from './allSchemaSelector';
import {modelSelector} from '../../list/selectors';

export default createSelector(allSchemaSelector, modelSelector,
  (schema, model) => _.find(schema, m => m.model === model)
);
