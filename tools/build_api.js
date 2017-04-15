/* eslint-disable */
require('shelljs/global');


echo('Building API ...');

// clean
rm('-rf', 'lib/routes');
rm('-rf', 'lib/schema');
rm('lib/*.js');

// move over server
exec('babel -d lib/ src/index.js');
exec('babel -d lib/ src/load_routes.js');
exec('babel -d lib/routes src/routes');
exec('babel -d lib/schema src/schema');

mv('lib/src/index.js', 'lib/index.js');
mv('lib/src/load_routes.js', 'lib/load_routes.js');
rm('-rf', 'lib/src');
