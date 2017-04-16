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

// install swagger-ui
var SWAGGER_UI_DIST = path.dirname(require.resolve('swagger-ui'));
var folders = ['public', 'manage', 'admin']
folders.forEach(function(element, index, array) {
    var deploy_spec_dir = path.join(deploy_dir, element)
    var swagger_ui_deploy_folder = path.join(deploy_spec_dir, 'swagger-ui')
    rm('-rf', swagger_ui_deploy_folder)
    cp('-R', SWAGGER_UI_DIST, swagger_ui_deploy_folder)
    sed('-i', 'http://petstore.swagger.io/v2/swagger.json', '../swagger.json', path.join(swagger_ui_deploy_folder, 'index.html'))
});

