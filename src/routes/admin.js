import {GET, logError} from 'node-bits';
import path from 'path';
import fs from 'fs';

const pathToFile = file =>
  `${path.resolve()}/node_modules/node-bits-admin/lib/admin/${file}`;

const isFile = url =>
  /\.(js|css|woff|woff2|eot|svg|ttf|)$/.test(path.basename(url));

const adminSpa = {
  get: (req, res) => {
    let file = pathToFile('index.html');
    if (isFile(req.url)) {
      file = pathToFile(path.basename(req.url));
    }

    fs.access(file, fs.constants.R_OK, err => {
      if (err) {
        logError(err);
        res.status(404).send();
        return;
      }

      res.status(200).sendFile(file);
    });
  },
};

export default () => {
  const adminRoot = '/admin';
  return [
    {
      verb: GET,
      route: adminRoot,
      implementation: adminSpa,
    },
    {
      verb: GET,
      route: `${adminRoot}*`,
      implementation: adminSpa,
    },
  ];
};
