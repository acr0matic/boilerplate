var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCSS = require("gulp-clean-css");
var concat = require("gulp-concat");
var babel = require("gulp-babel");

sass.compiler = require("node-sass");

gulp.task("sass", function() {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(
      sass({
        includePaths: require("node-normalize-scss").includePaths
      })
    )
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: true
      })
    )
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("compress", function() {
  return gulp
    .src("src/images/**/*")
    .pipe(
      imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest("dist/images"));
});

gulp.task("minify-js", function() {
  return gulp
    .src("dist/scripts/*.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("minify-css", function() {
  return gulp
    .src("dist/styles/*.css")
    .pipe(cleanCSS({ compatibility: "ie8", level: 1 }))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("default", function() {
  gulp.watch("src/styles/**/*.scss", gulp.series("sass"));
  gulp.watch("src/images/**/*", gulp.series("compress"));
  gulp.watch("src/scripts/*.js", gulp.series("scripts"));
});

gulp.task("fonts", function() {
  return gulp.src("src/fonts/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("scripts", function() {
  return gulp
    .src("src/scripts/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(concat("script.js"))
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("build", gulp.series("sass", "compress", "fonts", "scripts"));
