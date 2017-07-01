import defaultComparator from './defaultComparator';
import {SortDirection} from 'react-virtualized';

const ID = 'id';

export const rowClassName = ({index}) => {
  if (index < 0) return '';
  return index % 2 === 0 ? 'even' : 'odd';
};

export const getAtIndex = data =>
  ({index}) => data[index];

export const sortData = (data, {sortBy = ID, sortDirection}) => {
  const sortDirectionMultiplier = sortDirection === SortDirection.DESC ? -1 : 1;

  const comparator = (x, y) => {
    const result = defaultComparator(x[sortBy], y[sortBy]);
    if (result !== 0 || sortBy === ID) {
      return result * sortDirectionMultiplier;
    }

    return defaultComparator(x[ID], y[ID]);
  };

  return data.sort(comparator);
};
