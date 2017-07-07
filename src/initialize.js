import Media from './subscribers/media';
import Validate from './subscribers/validate';

export default config =>
  ({
    subscribers: [
      {implementation: new Media(config)},
      {implementation: new Validate(config)},
    ],
  });
