import React from 'react';
import Dropzone from 'react-dropzone';

export default (item, key, schema, input) => {
  const onDrop = files => {
    input.onChange(files[0]);
  };

  let preview = null;
  if (input.value instanceof File) {
    preview = (
      <img src={input.value.preview} className="image-preview" alt="preview" />
    );
  }

  return (
    <div>
      <Dropzone onDrop={onDrop} multiple={false} className="dropzone">
        <div>Click to select a file, or drag & drop file onto this square</div>
      </Dropzone>
      {preview}
    </div>
  );
};
