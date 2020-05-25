const gulp = require("gulp");
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();

function buildHTML() {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('public/'));
}

function reload(done) {
  browserSync.reload();
  done();
}

function log(done) {
  console.log('watched');
  done();
}

function watch() {
    browserSync.init({
       server: "public",
    });

    gulp.watch('public/*.css', gulp.series(reload));
    gulp.watch('public/scripts/*.js', gulp.series(reload));
    gulp.watch('src/pug/templates/*.pug', gulp.series(log, buildHTML, reload));
	  gulp.watch('src/pug/*.pug', gulp.series(buildHTML, reload)); 
    /* note: browser sync does not work properly if missing html, head, body tags */
}

exports.default = gulp.series(buildHTML, watch);