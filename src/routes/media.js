import {GET} from 'node-bits';

export default config => {
  const apiRoot = config.root || '/api';
  return {
    verb: GET,
    route: `${apiRoot}/media`,
    implementation: {
      get: (req, res) => {
        const {storage, database} = config;

        storage.getImage(req, res, database);
      },
    },
  };
};
