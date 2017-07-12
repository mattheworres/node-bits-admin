import _ from 'lodash';

export default (item, config) => {
  const {reference, referenceDisplay} = config.source;
  const related = item[reference];
  if (!related) {
    return '';
  }

  const relatedValue = _.isArray(related) ? related.map(r => r[referenceDisplay]).join(' ') : (related[referenceDisplay] || '');
  return relatedValue.toLowerCase();
};
