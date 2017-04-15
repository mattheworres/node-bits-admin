import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'class-autobind';

import {menuItemsSelector} from '../selectors';

class Menu extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  renderItems() {
    return this.props.items.map(item => (
      <li key={item}>
        <a href={`/admin/list/${item}`}>
          {_.upperFirst(item)}
        </a>
      </li>
    ));
  }

  render() {
    return (
      <ul>
        {this.renderItems()}
      </ul>
    );
  }
}

const mapStateToProps = state =>
({
  items: menuItemsSelector(state),
});

export default connect(mapStateToProps)(Menu);
