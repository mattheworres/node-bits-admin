import {createSelector} from 'reselect';

import modelsSelector from './modelsSelector';
import modelSelector from '../../list/selectors/modelSelector';

export default createSelector(modelsSelector, modelSelector,
  (models, model) => models.getIn([model])
);
