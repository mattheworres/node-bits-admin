import React from 'react';
import Dropzone from 'react-dropzone';

import {Image} from '../../../shared/components';

export default (item, key, schema, input, modelSchema) => {
  const onDrop = files => {
    input.onChange(files[0]);
  };

  let preview = null;
  if (input.value instanceof File) {
    preview = (
      <img src={input.value.preview} className="image-preview" alt="preview" />
    );
  } else if (input.value) {
    preview = (
      <Image item={item} field={key} model={modelSchema.model} className="image-preview" alt="preview" />
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
