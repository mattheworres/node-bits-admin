export default ({index}) => {
  if (index < 0) return '';
  return index % 2 === 0 ? 'even' : 'odd';
};
