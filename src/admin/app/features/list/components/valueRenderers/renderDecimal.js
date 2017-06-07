import numeral from 'numeral';

export default (item, key, schema) => numeral(item[key] || 0).format(schema.format);
