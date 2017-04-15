import {Component} from 'react';
import {connect} from 'react-redux';

import {loadCookie} from './features/auth/actions';
import {loadSchema} from './features/schema/actions';
import {userSelector} from './features/auth/selectors';

class App extends Component {
  componentWillMount() {
    this.props.loadCookie();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
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
});

export default connect(mapStateToProps, {loadCookie, loadSchema})(App);
