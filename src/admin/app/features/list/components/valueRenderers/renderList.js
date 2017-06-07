import React from 'react';
import {connect} from 'react-redux';

const render1to1 = (item, key, source) => (
  <span>{item[key][source.display]}</span>
);

const renderList = ({item, itemKey, schema}) => {
  const {source} = schema;

  if ((source.selections || 1) === 1) {
    return render1to1(item, itemKey, source);
  }

  return <span>Longer List</span>;
};

const RenderList = connect()(renderList);

export default (item, key, schema) => (
  <RenderList item={item} itemKey={key} schema={schema} />
);
