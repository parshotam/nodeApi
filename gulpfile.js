var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),

  prettify = require('gulp-jsbeautifier'),
  minifyCSS = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  templateCache = require('gulp-angular-templatecache'),
  jsbeautifyFolder = function(folderPath) {
    gulp.src(folderPath + '*.js')
      .pipe(plumber())
      .pipe(prettify({
        js: {
          indentSize: 2
        }
      }))
      .pipe(gulp.dest(folderPath));
  };



gulp.task('jsbeautify', function() {
  jsbeautifyFolder('./app/models/');
  jsbeautifyFolder('./app/helpers/');
  jsbeautifyFolder('./app/dbhelpers/');
  jsbeautifyFolder('./app/controllers/');
  // jsbeautifyFolder('./client/controllers/');
  // jsbeautifyFolder('./client/directives/');
  // jsbeautifyFolder('./client/services/');
  // jsbeautifyFolder('./client/filters/');
});



gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee handlebars',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('restart', function() {
    setTimeout(function() {
      livereload.changed(__dirname);
    }, 500);
  });
});


gulp.task('default',gulp.series('develop', function(done) {
// do more stuff
done();
})

)
// gulp.task('default', [
//   'develop',
//   // 'watch'
// ]);

// gulp.task('build', [
//   //'compass',
//   'templateCache',
//   'jscompress',
// ]);
