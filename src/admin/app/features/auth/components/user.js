import React from 'react';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';

import {logout} from '../actions';
import {userSelector, loginInfoSelector} from '../selectors';

const user = ({user, loginInfo, logout}) => {
  if (!user || !loginInfo) {
    return null;
  }

  return (
    <div className="user-display">
      <span className="username">{user.returnData[loginInfo.username]}</span>
      <FontAwesome name="sign-out" className="pull-right" onClick={logout} />
    </div>
  );
};

const mapStateToProps = state =>
({
  user: userSelector(state),
  loginInfo: loginInfoSelector(state),
});

export default connect(mapStateToProps, {logout})(user);
