import schemaInfo from './routes/schema_info';
import media from './routes/media';

export default config =>
  [
    schemaInfo(config),
    media(config),
  ];
