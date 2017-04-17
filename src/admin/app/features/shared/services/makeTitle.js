import pluralize from 'pluralize';
import Humanize from 'humanize-plus';

export default (string, options = {plural: true}) => {
  const split = string.split(/(?=[A-Z])/).join(' ');
  const title = Humanize.titleCase(split);

  return options.plural ? pluralize(title) : title;
};
