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

    if (stage !== BEFORE && ![POST, PUT].includes(verb)) {
      return;
    }

    _.forEach(_.keys(req.files), key => {
      const file = req.files[key];
      req.body[key] = this.storage.store(file);
    });
  }
}
