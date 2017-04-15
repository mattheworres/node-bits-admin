import {createSelector} from 'reselect';
import {allSchemaSelector} from '../../schema/selectors';

export default createSelector(allSchemaSelector, schema => {
  const items = schema.map(item => item.model);
  items.sort();

  return items;
});
