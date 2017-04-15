import schemaInfo from './routes/schema_info';
import media from './routes/media';
import admin from './routes/admin';

export default config =>
  [
    schemaInfo(config),
    media(config),

    ...admin(config),
  ];
