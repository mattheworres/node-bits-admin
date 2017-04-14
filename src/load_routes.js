import loadInfoRoutes from './routes/load_info_routes';

export default config =>
  [
    ...loadInfoRoutes(config),
  ];
