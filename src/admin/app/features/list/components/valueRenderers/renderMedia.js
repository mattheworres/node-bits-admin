import React from 'react';
import {Image} from '../../../shared/components';

export default (item, key, schema, modelSchema) =>
  (item[key] ? <Image item={item} field={key} model={modelSchema.model} /> : null);
