import makeTitle from './makeTitle';

export default item => makeTitle(item.title || item.model, {plural: item.pluralizeTitle});
