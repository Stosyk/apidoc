#!/usr/bin/env node
'use strict';
var path = require('path');
require('shelljs/global');

var resources_path = path.join('openapi-spec', 'resources')

mkdir('-p', 'spec')
cp('-R', path.join(resources_path, 'public', '*'), 'spec/');
exec('npm run swagger validate');
rm('-rf', 'spec')

mkdir('-p', 'spec')
cp('-R', path.join(resources_path, 'manage', '*'), 'spec/');
exec('npm run swagger validate');
rm('-rf', 'spec')

mkdir('-p', 'spec')
cp('-R', path.join(resources_path, 'admin', '*'), 'spec/');
exec('npm run swagger validate');
rm('-rf', 'spec')
