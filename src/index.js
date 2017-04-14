import loadRoutes from './load_routes';
import media from './schema/media';

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
    loadSchema: () => [media],
    loadRoutes: bitsConfig => load(loadRoutes, options, bitsConfig),
  });
