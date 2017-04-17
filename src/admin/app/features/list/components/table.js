import _ from 'lodash';
import $ from 'jquery';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Popover, OverlayTrigger} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import autobind from 'class-autobind';

import {editModel} from '../actions';
import {deleteModel} from '../../data/actions';
import {makeTitle} from '../../shared/services';

class ModelTable extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  // actions
  handleEdit(item, index) {
    this.hidePopover(index);

    const {schema} = this.props;
    this.props.editModel(schema, item);
  }

  handleDelete(item, index) {
    this.hidePopover(index);

    const {schema} = this.props;
    this.props.deleteModel(schema, item.id);
  }

  hidePopover(index) {
    $(`#options-popover-${index}`).hide();
  }

  // render
  renderHeader() {
    const {schema} = this.props;

    return (
      <tr>
        {
          _.map(schema.map, (value, key) => (
            <th key={key}>
              {makeTitle(key, {plural: false})}
            </th>
          ))
        }
        <th key="options" />
      </tr>
    );
  }

  renderBody() {
    const {schema, data} = this.props;

    return data.map((item, index) => {
      const popoverBottom = (
        <Popover id={`options-popover-${index}`} title="Options" className="popover-options">
          <ul>
            <li onClick={this.handleEdit.bind(this, item, index)}>
              <FontAwesome name="pencil" /> Edit
            </li>
            <li onClick={this.handleDelete.bind(this, item, index)}>
              <FontAwesome name="trash-o" /> Delete
            </li>
          </ul>
        </Popover>
      );

      return (
        <tr key={index}>
          {
            _.map(schema.map, (value, key) => (
              <td key={`${index}-${key}`}>
                {item[key]}
              </td>
            ))
          }
          <td key={`${index}-options`}>
            <div className="options">
              <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverBottom}>
                <FontAwesome name="cog" />
              </OverlayTrigger>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Table striped>
        <thead>
          {this.renderHeader()}
        </thead>
        <tbody>
          {this.renderBody()}
        </tbody>
      </Table>
    );
  }
}

export default connect(null, {editModel, deleteModel})(ModelTable);
