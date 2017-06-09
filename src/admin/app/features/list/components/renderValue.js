import {
  renderString, renderBoolean, renderDecimal, renderList,
} from './valueRenderers';

const rendererMap = {
  STRING: renderString,
  BOOLEAN: renderBoolean,
  DECIMAL: renderDecimal,
  LIST: renderList,
};

export default (item, key, schema) => {
  const renderer = rendererMap[schema.type];
  return renderer ? renderer(item, key, schema) : null;
};
