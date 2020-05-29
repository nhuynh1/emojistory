const gulp = require("gulp");
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const babel = require('gulp-babel');

function serve(done) {
  browserSync.init({
       proxy: "localhost:8080"
    });
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

function buildCSS() {
  const plugins = [ autoprefixer(), 
                    cssnano({ 
                      preset: ['default', { discardOverridden: false }] 
                    }) ];
  return gulp.src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/'));
}

function buildHTML() {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('public/'));
}

function buildJS() {
  const presets = ['@babel/preset-env'];
  return gulp.src('src/scripts/*.js')
    .pipe(babel({ presets }))
    .pipe(gulp.dest('public/scripts/'));
}

function watch() {

    gulp.watch('src/css/*.css', gulp.series(buildCSS, reload));
    gulp.watch('src/scripts/*.js', gulp.series(buildJS, reload));
    gulp.watch('src/pug/templates/*.pug', gulp.series(buildHTML, reload));
	  gulp.watch('src/pug/*.pug', gulp.series(buildHTML, reload)); 
    /* note: browser sync does not work properly if missing html, head, body tags */
}

exports.serve = gulp.series(serve, watch);
exports.build = gulp.series(buildHTML, buildCSS, buildJS);
exports.default = gulp.series(buildHTML, buildCSS, buildJS, watch);