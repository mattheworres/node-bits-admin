/* eslint-disable */
require('shelljs/global');

echo('Building Admin ...');

// clean
rm('-rf', 'lib/admin');
rm('-rf', 'src/admin/dist');

// build admin spa and move it
cd('src/admin');
echo(pwd());
exec('yarn');
exec('yarn run build', (code, stdout, stderr) => {
  cd('../..');
  mv('src/admin/dist', 'lib/admin');

  echo('Build Complete');
});
