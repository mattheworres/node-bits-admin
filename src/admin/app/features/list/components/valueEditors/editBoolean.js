import React from 'react';
import {Checkbox} from 'react-bootstrap';

export default (item, key, schema, input) => {
  const handleChange = e => {
    input.onChange(e.target.checked);
  };

  return (
    <div className="checkbox-container">
      <Checkbox inline value={input.value} checked={input.value} onChange={handleChange} />
    </div>
  );
};
