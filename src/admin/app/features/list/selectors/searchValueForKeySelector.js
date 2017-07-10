import {createSelector} from 'reselect';

import searchSelector from './searchSelector';
import searchKeySelector from './searchKeySelector';

export default createSelector(searchSelector, searchKeySelector,
  (search, searchKey) => search[searchKey] || '');
