import _ from 'lodash';
import {GET, READ_WRITE, HIDDEN} from 'node-bits';

const mapFields = (schema, config) =>
  _.reduce(schema, (result, value, key) => {
    const fieldConfig = config.map ? config.map[key] || {} : {};
    return {
      ...result,
      [key]: {
        ...value,
        ...fieldConfig,
      },
    };
  }, config.map);

const mapSchema = (schema, models) =>
  _.reduce(schema, (result, value, key) => {
    const config = _.find(models, m => m.model === key);
    if (!config) {
      return [
        ...result,
        {
          model: key,
          mode: READ_WRITE,
          map: value,
        },
      ];
    }

    if (config.mode === HIDDEN) {
      return result;
    }

    return [
      ...result,
      {
        ...config,
        map: mapFields(value, config),
      },
    ];
  }, []);

export default config => {
  const apiRoot = config.root || '/api';
  return {
    verb: GET,
    route: `${apiRoot}/schema_info`,
    implementation: {
      get: (req, res) => {
        const result = _.reduce(config.schema,
          (result, value) => [...result, ...mapSchema(value.schema, config.models)], []);

        res.json(result);
      },
    },
  };
};
