import React from 'react';
export default (item, key) => (
  <div className="rich-text" dangerouslySetInnerHTML={{__html: item[key]}} /> // eslint-disable-line
);
