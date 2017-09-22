import React from 'react';
import {makeTitle} from '../../../shared/services';


const render1To1 = (item, itemKey, source) => {
  const relatedItem = item[source.referenceField];
  const value = relatedItem ? relatedItem[source.referenceDisplay] : null;

  return (
    <span>{value}</span>
  );
};

const RenderOrderedList = ({item, itemKey, schema}) => {
  const {source} = schema;

  const values = item[source.referenceField] || [];

  return (
    <span>{values.length} {makeTitle(source.title || itemKey).toLowerCase()}</span>
  );
};

export default (item, key, schema) => (
  <RenderOrderedList item={item} itemKey={key} schema={schema} />
);
