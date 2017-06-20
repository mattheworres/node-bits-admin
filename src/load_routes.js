import schemaInfo from './routes/schema_info';
import loginInfo from './routes/login_info';
import media from './routes/media';
import admin from './routes/admin';
import updateReferences from './routes/update_references';

export default config =>
  [
    schemaInfo(config),
    loginInfo(config),
    media(config),
    updateReferences(config),

    ...admin(config),
  ];
