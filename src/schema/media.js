import {STRING} from 'node-bits';

export default {
  schema: {
    media: {
      name: {type: STRING},
      path: {type: STRING},
    },
  },
  indexes: [
    {
      model: 'media',
      fields: ['name'],
      unique: true,
    },
  ],
};
