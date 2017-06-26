import {Component} from 'react';
import {connect} from 'react-redux';

import {loadCookie, loadLoginInfo} from './features/auth/actions';
import {loadSchema} from './features/schema/actions';
import {userSelector, loginInfoSelector} from './features/auth/selectors';

class App extends Component {
  componentWillMount() {
    this.props.loadCookie();
    this.props.loadLoginInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user || !nextProps.loginInfo.required) {
      this.props.loadSchema();
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state =>
({
  user: userSelector(state),
  loginInfo: loginInfoSelector(state),
});

export default connect(mapStateToProps, {loadCookie, loadLoginInfo, loadSchema})(App);
