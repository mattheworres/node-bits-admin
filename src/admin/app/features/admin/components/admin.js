import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';

import {Menu} from '../../menu/components';
import {Login} from '../../auth/components';
import {userSelector, loginInfoSelector} from '../../auth/selectors';

const loginRequired = (auth, loginInfo) => loginInfo.required && !auth;

const renderLogin = () => (
  <Row>
    <Col xs={12}>
      <Login />
    </Col>
  </Row>
);

const renderAdmin = children => (
  <Row>
    <Col xs={2}>
      <Menu />
    </Col>
    <Col xs={10}>
      {children}
    </Col>
  </Row>
);

const admin = ({auth, loginInfo, children}) =>
  (loginRequired(auth, loginInfo) ? renderLogin() : renderAdmin(children));

const mapStateToProps = state =>
({
  auth: userSelector(state),
  loginInfo: loginInfoSelector(state),
});

export default connect(mapStateToProps)(admin);
