import _ from 'lodash';
import {BEFORE, POST, PUT} from 'node-bits';

export default class MediaSubscriber {
  constructor(config) {
    this.storage = config.storage;
  }

  subscribe() {
    return true;
  }

  perform(args) {
    const {req, stage, verb} = args;

    if (![POST, PUT].includes(verb) || stage !== BEFORE) {
      return null;
    }

    return Promise.all(_.keys(req.files).map(key => {
      const file = req.files[key];
      const storeResult = this.storage.store(file, key, args);

      let promise = Promise.resolve(storeResult);
      if (storeResult && storeResult.then) {
        promise = storeResult;
      }

      return promise.then(value => {
        req.body[key] = value;
      });
    }));
  }
}
