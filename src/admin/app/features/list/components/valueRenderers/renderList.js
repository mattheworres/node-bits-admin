import React from 'react';
import {connect} from 'react-redux';
import {makeTitle} from '../../../shared/services';

const render1to1 = (item, source) => (
  <span>{item[source.key][source.display]}</span>
);

const render1ToM = (item, itemKey, source) => {
  const values = item[source.key] || [];

  if (values.length > 0 && values.length <= 3) {
    return values.map(x => x[source.display]).join(', ');
  }

  return (
    <span>{values.length} {makeTitle(itemKey).toLowerCase()}</span>
  );
};

const renderList = ({item, itemKey, schema}) => {
  const {source} = schema;

  if ((source.selections || 1) === 1) {
    return render1to1(item, source);
  }

  return render1ToM(item, itemKey, source);
};

const RenderList = connect()(renderList);

export default (item, key, schema) => (
  <RenderList item={item} itemKey={key} schema={schema} />
);
