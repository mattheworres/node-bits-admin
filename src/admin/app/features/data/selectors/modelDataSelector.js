import {createSelector} from 'reselect';

import modelsSelector from './modelsSelector';
import modelSelector from '../../list/selectors/modelSelector';

export default createSelector(modelsSelector, modelSelector,
  (models, model) => {
    const data = models.getIn([model]);
    return data ? data.toJS() : [];
  }
);
