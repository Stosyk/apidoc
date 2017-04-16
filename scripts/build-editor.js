#!/usr/bin/env node
'use strict';

var path = require('path');

require('shelljs/global');
set('-e');

var spec = process.argv[2]
var deploy_dir = 'web_deploy'
var deploy_spec_dir = path.join(deploy_dir, spec)

rm('-rf', deploy_dir) // cleanup deploy folder because we want deploy only part of the project
mkdir('-p', deploy_dir)
mkdir('-p', deploy_spec_dir)
cp('-R', path.join('web', spec, '*'), deploy_spec_dir);
cp(path.join('web', 'index.html'), deploy_dir);

rm('-rf', 'spec') // cleanup tmp build folder for swagger-bundle coz it could be a symbolic link
var spec_folder_path = path.join('openapi-spec', 'resources', spec)
exec('ln -s ' + spec_folder_path + ' spec');

exec('npm run swagger bundle --        -o ' + path.join(deploy_spec_dir, 'swagger.json'));
exec('npm run swagger bundle -- --yaml -o ' + path.join(deploy_spec_dir, 'swagger.yaml'));

var SWAGGER_UI_DIST = path.dirname(require.resolve('swagger-ui'));
var swagger_ui_deploy_folder = path.join(deploy_spec_dir, 'swagger-ui')
rm('-rf', swagger_ui_deploy_folder)
cp('-R', SWAGGER_UI_DIST, swagger_ui_deploy_folder)
sed('-i', 'http://petstore.swagger.io/v2/swagger.json', '../swagger.json', path.join(swagger_ui_deploy_folder, 'index.html'))

sed('-i', 'url=/public/', 'url=/' + spec, path.join(deploy_dir, 'index.html'))
