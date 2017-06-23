import React from 'react';
import {connect} from 'react-redux';
import {API_BASE_URL} from 'configs'; // eslint-disable-line

import {userSelector} from '../../../auth/selectors';

const image = ({url, user}) => (
  <img src={`${url}&token=${user.token}`} />
);

const ConnectedImage = connect(state =>
({
  user: userSelector(state),
}))(image);

export default (item, key, schema, fullSchema) => {
  const url = `${API_BASE_URL}media?model=${fullSchema.model}&field=${key}&id=${item.id}`;

  return item[key] ? <ConnectedImage url={url} /> : null;
};
