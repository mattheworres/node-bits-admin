import _ from 'lodash';
import {BEFORE, AFTER, POST, PUT} from 'node-bits';

export default class MediaSubscriber {
  constructor(config) {
    this.storage = config.storage;
  }

  subscribe() {
    return true;
  }

  perform(args) {
    const {req, stage, verb} = args;

    if (![POST, PUT].includes(verb)) {
      return;
    }

    if (stage === BEFORE) {
      _.forEach(_.keys(req.files), key => {
        const file = req.files[key];
        req.body[key] = this.storage.store(file, key, args);
      });
      return;
    }

    if (stage === AFTER) {
      _.forEach(_.keys(req.files), key => {
        const file = req.files[key];
        const field = req.body[key];

        if (this.storage.afterStore) {
          this.storage.afterStore(file, key, field, args);
        }
      });
    }
  }
}
