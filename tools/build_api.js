/* eslint-disable */
require('shelljs/global');


echo('Building API ...');

// clean
rm('-rf', 'lib/routes');
rm('-rf', 'lib/subscribers');
rm('-rf', 'lib/mediaStorage');
rm('lib/*.js');

// move over server
exec('babel -d lib/ src/index.js');
exec('babel -d lib/ src/load_routes.js');
exec('babel -d lib/ src/initialize.js');
exec('babel -d lib/routes src/routes');
exec('babel -d lib/subscribers src/subscribers');
exec('babel -d lib/mediaStorage src/mediaStorage');

mv('lib/src/index.js', 'lib/index.js');
mv('lib/src/load_routes.js', 'lib/load_routes.js');
mv('lib/src/initialize.js', 'lib/initialize.js');
rm('-rf', 'lib/src');
