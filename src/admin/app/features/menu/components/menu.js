import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'class-autobind';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Humanize from 'humanize-plus';
import pluralize from 'pluralize';

import {selectMenuItem} from '../actions';
import {menuItemsSelector, activeKeySelector} from '../selectors';

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
      const text = pluralize(
        Humanize.titleCase(
          item.split(/(?=[A-Z])/).join(' ')
        )
      );

      return (
        <LinkContainer key={item} to={`?item=${item}`}>
          <NavItem eventKey={item}>{text}</NavItem>
        </LinkContainer>
      );
    });
  }

  render() {
    return (
      <div className="menu">
        <h4>Models</h4>
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
