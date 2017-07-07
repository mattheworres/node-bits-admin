import _ from 'lodash';
import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import {BEFORE, POST, PUT} from 'node-bits';

export default class ValidateSubscriber {
  constructor(config) {
    this.modelConfig = config.models;

    this.ajv = new Ajv({allErrors: true, jsonPointers: true});
    ajvErrors(this.ajv);
  }

  subscribe() {
    return true;
  }

  perform(args) {
    const {req, res, name, stage, verb, resultSent} = args;

    if (![POST, PUT].includes(verb) || stage !== BEFORE || resultSent) {
      return false;
    }

    const modelConfig = _.find(this.modelConfig, c => c.model === name);
    if (!modelConfig || !modelConfig.validate) {
      return false;
    }

    const validate = this.ajv.compile(modelConfig.validate);
    if (!validate(req.body)) {
      res.status(500).json(validate.errors);
      args.failure = true;
      return true;
    }

    return false;
  }
}
