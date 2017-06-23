import Media from './subscribers/media';

export default config =>
  ({
    subscribers: [
      {implementation: new Media(config)},
    ],
  });
