import {createSelector} from 'reselect';
import {allSchemaSelector} from '../../schema/selectors';

export default createSelector(allSchemaSelector, schema => schema.map(item => item.model));
