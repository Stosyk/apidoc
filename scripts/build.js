#!/usr/bin/env node
'use strict';

var path = require('path');

require('shelljs/global');
set('-e');

var deploy_dir = 'web_deploy'

mkdir('-p', deploy_dir)
cp('-R', 'web/*', deploy_dir);

var openapi_spec = 'openapi-spec'
var build_script = path.join(openapi_spec, 'scripts', 'build-spec.js')

rm('-rf', 'spec') // cleanup tmp build folder for swagger coz it could be a symbolic link
exec('node ' + build_script + ' ' + openapi_spec + ' ./');
