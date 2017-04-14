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
    loadRoutes: bitsConfig => load(loadRoutes, options, bitsConfig),
  });
