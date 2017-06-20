import {createSelector} from 'reselect';

import listModelSelector from './listModelSelector';
import {modelsSelector} from '../../data/selectors';

export default createSelector(modelsSelector, listModelSelector,
  (models, model) => {
    const data = models.getIn([model]);
    return data ? data.toJS() : [];
  }
);
