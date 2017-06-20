import _ from 'lodash';
import {
  logError,
  POST, MANY_TO_MANY, ONE_TO_MANY,
} from 'node-bits';

class UpdateReferences {
  constructor(db) {
    this.db = db;
  }

  handleError(res, err) {
    logError(err);
    res.status(500).send();
  }

  update1toM(res, root, source, data) {
    const modelId = `${root.model}Id`;
    const referenceKey = source.referenceKey;

    this.db.find(source.reference, {where: {[modelId]: root.id}})
      .then(response => {
        // figure out what we have to do
        const toRemove = _.filter(response, x => !_.some(data, d => d[referenceKey] === x[referenceKey]));
        const toAdd = _.filter(data, d => !_.some(response, x => x[referenceKey] === d[referenceKey]));

        // do it
        const toDo = [
          ...toRemove.map(x => this.db.update(source.reference, x.id, {[modelId]: null})),
          ...toAdd.map(x => this.db.update(source.reference, x.id, {[modelId]: root.id})),
        ];

        Promise.all(toDo)
          .then(res.send())
          .catch(err => this.handleError(res, err));
      })
      .catch(err => this.handleError(res, err));
  }

  updateMtoM(res, root, source, data) {
    const modelId = `${root.model}Id`;
    const referenceId = `${source.reference}Id`;
    const referenceKey = source.referenceKey;
    const joinModel = `${root.model}_${source.reference}`;

    this.db.find(joinModel, {where: {[modelId]: root.id}})
      .then(response => {
        // figure out what we have to do
        const toRemove = _.filter(response, x => !_.some(data, d => d[referenceKey] === x[referenceId]));
        const toAdd = _.filter(data, d => !_.some(response, x => x[referenceId] === d[referenceKey]));

        // do it
        const toDo = [
          ...toRemove.map(x => this.db.delete(joinModel, x.id)),
          ...toAdd.map(x => this.db.create(joinModel, {[modelId]: root.id, [referenceId]: x.id})),
        ];

        Promise.all(toDo)
          .then(res.send())
          .catch(err => this.handleError(res, err));
      })
      .catch(err => this.handleError(res, err));
  }

  post(req, res) {
    const {root, source, data} = req.body;

    switch (source.type) {
      case MANY_TO_MANY:
        this.updateMtoM(res, root, source, data);
        break;

      case ONE_TO_MANY:
        this.update1toM(res, root, source, data);
        break;

      default:
        res.status(500).send('Unable to process request');
    }
  }
}


export default config => {
  const apiRoot = config.root || '/api';
  return {
    verb: POST,
    route: `${apiRoot}/update_references`,
    implementation: new UpdateReferences(config.database),
  };
};
