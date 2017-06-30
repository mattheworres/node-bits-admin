import fs from 'fs';
import path from 'path';
import {logError} from 'node-bits';

export default config => ({
  store: file => {
    if (!fs.existsSync(config.path)) {
      fs.mkdirSync(config.path);
    }

    const filePath = path.join(config.path, file.name);
    file.mv(filePath);

    return filePath;
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
        const filePath = item[field];
        if (!filePath) {
          res.send();
          return;
        }

        res.status(200).sendFile(filePath);
      })
      .catch(err => {
        logError(err);
        res.status(500).send(err);
      });
  },
});
