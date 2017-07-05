import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'class-autobind';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {selectMenuItem} from '../actions';
import {menuItemsSelector, activeKeySelector} from '../selectors';
import {makeTitle} from '../../shared/services';

import {User} from '../../auth/components';

class Menu extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  // actions
  handleSelect(item) {
    this.props.selectMenuItem(item);
  }

  // render
  renderItems() {
    return this.props.items.map(item => {
      const key = item.model;
      const text = makeTitle(item.title || item.model);
      return (
        <LinkContainer key={key} to={`/admin/list/${key}`}>
          <NavItem eventKey={key}>{text}</NavItem>
        </LinkContainer>
      );
    });
  }

  render() {
    return (
      <div className="menu">
        <h4>User</h4>
        <User />

        <h4>Menu</h4>
        <Nav stacked activeKey={this.props.activeKey} onSelect={this.handleSelect}>
          {this.renderItems()}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state =>
({
  items: menuItemsSelector(state),
  activeKey: activeKeySelector(state),
});

export default connect(mapStateToProps, {selectMenuItem})(Menu);
