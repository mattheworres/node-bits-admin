import React, {Component} from 'react';
import {connect} from 'react-redux';
import Humanize from 'humanize-plus';
import {reduxForm, Field} from 'redux-form';
import autobind from 'class-autobind';
import {ControlLabel, FormControl, Button} from 'react-bootstrap';

import {login} from '../actions';
import {loginInfoSelector} from '../selectors';

class Login extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleLogin(form) {
    this.props.login(form, this.props.loginInfo);
  }

  renderComponent(field) {
    return (
      <div>
        <ControlLabel>{Humanize.titleCase(field.input.name)}</ControlLabel>
        <FormControl {...field.input} type={field.type} />
      </div>
    );
  }

  render() {
    const {loginInfo, handleSubmit} = this.props;
    if (!loginInfo) {
      return null;
    }

    const {username, password} = loginInfo;
    return (
      <div className="login-form">
        <form onSubmit={handleSubmit(this.handleLogin)}>
          <Field name={username} component={this.renderComponent} type="text" />
          <Field name={password} component={this.renderComponent} type="password" />
          <Button bsStyle="primary" className="pull-right" type="submit">Login</Button>
        </form>
      </div>
    );
  }
}

const form = reduxForm({
  form: 'login',
})(Login);

const mapStateToProps = state =>
({
  loginInfo: loginInfoSelector(state),
});

export default connect(mapStateToProps, {login})(form);
