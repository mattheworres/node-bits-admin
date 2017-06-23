import _ from 'lodash';
import {createSelector} from 'reselect';
import {allSchemaSelector} from '../../schema/selectors';

export default createSelector(allSchemaSelector, schema => _.sortBy(schema, item => (item.title || item.model).toLowerCase()));
