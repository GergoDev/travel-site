var gulp = require("gulp"),
    imagemin = require("gulp-imagemin"),
    usemin = require("gulp-usemin"),
    rev = require("gulp-rev"),
    cssnano = require("gulp-cssnano"),
    uglify = require("gulp-uglify"),
    browserSync = require("browser-sync").create();

gulp.task("previewdist", function() {
  browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task("deleteDistFolder", function() {
  return del("./docs");
});

gulp.task("optimizeImages", ["deleteDistFolder"], function() {
  return gulp.src(["./app/assets/images/**/*", "!app/assets/images/icons", "!app/assets/images/icons/**/*"])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task("usemin", ["deleteDistFolder"], function() {
  return gulp.src("./app/index.html")
        .pipe(usemin({
          css: [function() {return rev()}, function() {return cssnano()}],
          js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
});

gulp.task("build", ["deleteDistFolder", "optimizeImages", "usemin"]);