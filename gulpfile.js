var babel = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gulpIf = require("gulp-if");
var source = require('vinyl-source-stream');
var uglify = require("gulp-uglify");
var watchify = require('watchify');

function compile(env) {
  var isDev = !(process.env.NODE_ENV === "production");
  var bundler = browserify('./src/webapp.js', { debug: isDev });

  function bundle() {
   bundler.bundle()
    .on("error", function(err) { console.error(err); this.emit("end"); })
    .pipe(source("build.js"))
    .pipe(gulpIf(!isDev, buffer()))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(gulp.dest("./build")); 
  }

  bundler.transform(babel);

  if (isDev) {
    bundler.plugin(watchify);
    bundler.on("update", function() {
      console.log("-> File changes. Bundling...");
    });
  }

  bundle();
}

gulp.task("compile", function() { return compile(); });
gulp.task('default', ['compile']);
