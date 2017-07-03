import imgur from 'imgur';
import UUID from 'uuid-js';
import {logError} from 'node-bits';

const defaultUrl = 'https://api.imgur.com/3/';

export default config => ({
  store: () => UUID.create().toString(),

  afterStore(file, key, field, args) {
    const {database, name} = args;
    const base64 = file.data.toString('base64');

    // upload image
    imgur.setClientId(config.clientId);
    imgur.setAPIUrl(config.apiUrl || defaultUrl);

    imgur.uploadBase64(base64)
      .then(json =>
        // update the record
        database.find(name, {[key]: field}).then(records => {
          const record = records[0];
          if (!record) {
            throw new Error(`No '${name}' found with '${key}' set to '${field}' something went wrong`);
          }

          return database.update(name, record.id, {[key]: json.data.link});
        }))
      .catch(logError);
  },

  getImage: (req, res, db) => {
    const model = req.query.model;
    if (!model) {
      res.status(404).send('You must provide model for this configuration.');
      return;
    }

    const field = req.query.field;
    if (!field) {
      res.status(404).send('You must provide field for this configuration.');
      return;
    }

    const id = req.query.id;
    if (!id) {
      res.status(404).send('You must provide id for this configuration.');
      return;
    }

    db.findById(model, id)
      .then(item => {
        res.redirect(item[field]);
      })
      .catch(err => {
        logError(err);
        res.status(500).send(err);
      });
  },
});
