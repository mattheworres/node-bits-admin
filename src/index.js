import initialize from './initialize';
import loadRoutes from './load_routes';

// compile
const compileConfiguration = (options = {}, bitsConfig) =>
  ({
    ...options,
    ...bitsConfig,
  });

const load = (func, options, bitsConfig) =>
  func(compileConfiguration(options, bitsConfig));

export default options =>
  ({
    initialize: bitsConfig => load(initialize, options, bitsConfig),
    loadRoutes: bitsConfig => load(loadRoutes, options, bitsConfig),
  });

export * from './mediaStorage';
