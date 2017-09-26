import React from 'react';
import {makeTitle} from '../../../shared/services';


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
