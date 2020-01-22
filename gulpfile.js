var gulp = require("gulp");
var del = require("del");
var changed = require("gulp-changed");
var rename = require("gulp-rename");

var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");

var concat = require("gulp-concat");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");

var htmlReplace = require("gulp-html-replace");
var htmlMin = require("gulp-htmlmin");

var imagemin = require("gulp-imagemin");
var favicons = require("gulp-favicons");

sass.compiler = require("node-sass");

var config = {
  dist: "dist/",
  src: "src/",
  js_in: "src/scripts/**/*.js",
  img_in: "src/img/**/*.{jpg,jpeg,png,gif,svg}",
  html_in: "src/*.html",
  scss_in: "src/styles/scss/**/*.scss",
  compiled_ccs_in: "src/styles/compiled/*.css",
  favicon_in: "src/img/favicons/*",

  compiled_ccs_out: "src/styles/compiled/",
  css_out: "dist/css/",
  js_out: "dist/js/",
  img_out: "dist/img/",
  html_out: "dist/",
  favicon_out: "dist/img/favicons",

  css_out_name: "style.css",
  css_out_min_name: "style.min.css",
  js_out_name: "script.js",
  js_out_min_name: "script.min.js",

  css_replace_out: "css/style.min.css",
  js_replace_out: "js/script.min.js",
};

gulp.task("clean", () => {
  return del([config.dist]);
});

gulp.task("html", function() {
  return gulp
    .src(config.html_in)
    .pipe(
      htmlReplace({
        "css": config.css_replace_out,
        "js": config.js_replace_out,
      })
    )
    .pipe(
      htmlMin({
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest(config.dist));
});

gulp.task("default", function() {
  gulp.watch(config.scss_in, gulp.series("sass"));
});

gulp.task("sass", function() {
  return gulp
    .src(config.scss_in)
    .pipe(changed(config.css_out))
    .pipe(sass())
    .pipe(rename(config.css_out_name))
    .pipe(gulp.dest(config.compiled_ccs_out));
});

gulp.task("css-build", function() {
  return gulp.src(config.compiled_ccs_in).pipe(
    autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
      cascade: false,
    })
  );
});

gulp.task("css-minify", function() {
  return gulp
    .src(config.compiled_ccs_in)
    .pipe(cleanCSS({ compatibility: "ie8", level: 2 }))
    .pipe(rename(config.css_out_min_name))
    .pipe(gulp.dest(config.css_out));
});

gulp.task("scripts-build", function() {
  return gulp
    .src(config.js_in)
    .pipe(changed(config.js_out))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(rename(config.js_out_min_name))
    .pipe(gulp.dest(config.js_out));
});

gulp.task("scripts-minify", function() {
    return gulp
      .src(config.js_in)
      .pipe(uglify())
      .pipe(rename(config.js_out_min_name))
      .pipe(gulp.dest(config.js_out));
  });

gulp.task("image-min", function() {
  return gulp
    .src(config.img_in)
    .pipe(changed(config.img_out))
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(gulp.dest(config.img_out));
});

gulp.task("fonts", function() {
  return gulp.src("src/fonts/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("favicons", () => {
  return gulp
    .src(config.favicon_in)
    .pipe(
      favicons({
        icons: {
          appleIcon: true,
          favicons: true,
          online: false,
          appleStartup: false,
          android: false,
          firefox: false,
          yandex: false,
          windows: false,
          coast: false,
        },
      })
    )
    .pipe(gulp.dest(config.favicon_out));
});

gulp.task(
  "build",
  gulp.series("clean", "html", "scripts-build", "scripts-minify", "sass", "css-build", "css-minify", "image-min", "fonts", "favicons")
);
