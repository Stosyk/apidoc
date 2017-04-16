var gulp = require('gulp');
var util = require('gulp-util')
var gulpConnect = require('gulp-connect');
var connect = require('connect');
var cors = require('cors');
var path = require('path');
var exec = require('child_process').exec;
var portfinder = require('portfinder');
var swaggerRepo = require('swagger-repo');

var DIST_DIR = 'web_deploy';

gulp.task('serve', ['build', 'watch', 'edit'], function() {
  var spec = util.env.spec
  
  portfinder.getPort({port: 3000}, function (err, port) {
    gulpConnect.server({
      root: [DIST_DIR],
      livereload: true,
      port: port,
      middleware: function (gulpConnect, opt) {
        return [
          cors()
        ]
      }
    });
    if (typeof spec !== 'undefined') {
      util.log(util.colors.green('🚀 front started http://localhost:' + port + '/' + spec));
    }
  });
});

gulp.task('edit', ['build'], function() {
  var spec = util.env.spec
  if (typeof spec == 'undefined') {
    util.log(util.colors.red('spec: ' + spec));
    util.log(util.colors.red('skip editor'));
    return;
  } else {
    util.log(util.colors.green('spec: ' + spec));
  }
  portfinder.getPort({port: 5000}, function (err, port) {
    var app = connect();
    app.use(swaggerRepo.swaggerEditorMiddleware());
    app.listen(port);
    util.log(util.colors.green('swagger-editor started http://localhost:' + port));
  });
});

gulp.task('build', function (cb) {
  var spec = util.env.spec
  var build_command = (typeof spec == 'undefined' ? 'npm run build' : 'npm run build-editor ' + spec)
  util.log(util.colors.green('command: ' + build_command));
  exec(build_command, function (err, stdout, stderr) {
    console.log(stderr);
    cb(err);
  });
});

gulp.task('reload', ['build', 'edit'], function () {
  gulp.src(DIST_DIR).pipe(gulpConnect.reload())
});

gulp.task('watch', ['edit'], function () {
  gulp.watch(['spec/**/*', 'web/**/*'], ['reload']);
});
