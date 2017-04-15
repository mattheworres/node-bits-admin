import schemaInfo from './routes/schema_info';
import loginInfo from './routes/login_info';
import media from './routes/media';
import admin from './routes/admin';

export default config =>
  [
    schemaInfo(config),
    loginInfo(config),
    media(config),

    ...admin(config),
  ];
