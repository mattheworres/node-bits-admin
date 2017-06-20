import _ from 'lodash';
import {GET, logError} from 'node-bits';

const findByIdOrName = (req, db) => {
  const id = req.query.id;
  const name = req.query.name;
  if (id) {
    return db.findById('media', id);
  } else if (name) {
    return db.find('media', {where: {name}});
  }

  return null;
};

class Media {
  constructor(db) {
    this.db = db;
  }

  get(req, res) {
    const media = findByIdOrName(req, this.db);
    if (!media) {
      res.status(404).send();
      return;
    }

    media
      .then(result => {
        const file = _.isArray(result) ? result[0] : result;
        if (!file) {
          res.status(404).send();
          return;
        }

        res.status(200).sendFile(file.path);
      })
      .catch(err => {
        logError(err);
        res.status(500).send(err);
      });
  }
}

export default config => {
  const apiRoot = config.root || '/api';
  return {
    verb: GET,
    route: `${apiRoot}/_media`,
    implementation: new Media(config.database),
  };
};
