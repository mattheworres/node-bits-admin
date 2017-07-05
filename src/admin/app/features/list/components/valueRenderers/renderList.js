import React from 'react';
import {makeTitle} from '../../../shared/services';
import {ONE_TO_ONE, ONE_TO_MANY, MANY_TO_MANY, MANY_TO_ONE} from '../../../shared/constants';

const render1To1 = (item, itemKey, source) => {
  const relatedItem = item[source.referenceField];
  const value = relatedItem ? relatedItem[source.referenceDisplay] : null;

  return (
    <span>{value}</span>
  );
};

const renderNToM = (item, itemKey, source) => {
  const values = item[source.referenceField] || [];

  if (values.length > 0 && values.length <= 3) {
    return (
      <span>
        {values.map(x => x[source.referenceDisplay]).join(', ')}
      </span>
    );
  }

  return (
    <span>{values.length} {makeTitle(source.title || itemKey).toLowerCase()}</span>
  );
};

const RenderList = ({item, itemKey, schema}) => {
  const {source} = schema;

  const renderMap = {
    [ONE_TO_ONE]: render1To1,
    [MANY_TO_ONE]: render1To1,

    [ONE_TO_MANY]: renderNToM,
    [MANY_TO_MANY]: renderNToM,
  };

  const render = renderMap[source.type];
  return render ? render(item, itemKey, source) : null;
};

export default (item, key, schema) => (
  <RenderList item={item} itemKey={key} schema={schema} />
);
