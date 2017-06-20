import React from 'react';
import {makeTitle} from '../../../shared/services';
import {ONE_TO_ONE} from '../../../shared/constants';

const render1to1 = (item, itemKey, source) => (
  <span>{item[source.reference][source.referenceDisplay]}</span>
);

const renderNToM = (item, itemKey, source) => {
  const values = item[itemKey] || [];

  if (values.length > 0 && values.length <= 3) {
    return (
      <span>
        {values.map(x => x[source.referenceDisplay]).join(', ')}
      </span>
    );
  }

  return (
    <span>{values.length} {makeTitle(itemKey).toLowerCase()}</span>
  );
};

const RenderList = ({item, itemKey, schema}) => {
  const {source} = schema;

  if (source.type === ONE_TO_ONE) {
    return render1to1(item, itemKey, source);
  }

  return renderNToM(item, itemKey, source);
};

export default (item, key, schema) => (
  <RenderList item={item} itemKey={key} schema={schema} />
);
