import React from 'react';
import {connect} from 'react-redux';
import {API_BASE_URL} from 'configs'; // eslint-disable-line
import UUID from 'uuid-js';

import {userSelector, loginInfoSelector} from '../../auth/selectors';

const image = ({item, field, model, user, loginInfo, className, alt}) => {
  const bust = UUID.create();
  const url = `${API_BASE_URL}media?model=${model}&field=${field}&id=${item.id}&bust=${bust}`;


  let src = url;
  if (loginInfo.required) {
    src = `${url}&token=${user.token}`;
  }

  return (
    <img src={src} className={className} alt={alt} />
  );
};

const mapStateToProps = state =>
({
  loginInfo: loginInfoSelector(state),
  user: userSelector(state),
});

export default connect(mapStateToProps)(image);
