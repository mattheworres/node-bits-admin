import $ from 'jquery';
import React from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const handleSelection = (index, item, onClick) => () => {
  $(`#options-popover-${index}`).hide();

  if (onClick) {
    onClick(item);
  }
};


export default ({index, item, onEdit, onDelete}) => {
  const popoverBottom = (
    <Popover id={`options-popover-${index}`} title="Options" className="popover-options">
      <ul>
        <li onClick={handleSelection(index, item, onEdit)}>
          <FontAwesome name="pencil" /> Edit
        </li>
        <li onClick={handleSelection(index, item, onDelete)}>
          <FontAwesome name="trash-o" /> Delete
        </li>
      </ul>
    </Popover>
  );

  return (
    <div className="options">
      <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverBottom}>
        <FontAwesome name="cog" />
      </OverlayTrigger>
    </div>
  );
};
