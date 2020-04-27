var gulp = require("gulp");
var del = require("del");
var rename = require("gulp-rename");

var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var purgecss = require("gulp-purgecss");
var sourcemaps = require("gulp-sourcemaps");

var concat = require("gulp-concat");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify-es").default;

var htmlReplace = require("gulp-html-replace");
var htmlMin = require("gulp-htmlmin");

var imagemin = require("gulp-imagemin");
var favicons = require("gulp-favicons");

var sitemap = require("gulp-sitemap");
var robots = require("gulp-robots/es5");

sass.compiler = require("node-sass");

// Конфиг объект, здесь прописаны все пути для сборщика
var config = {
  dist: "dist/",
  src: "src/",

  js_path: "src/scripts/*.js",
  js_libraries_path: "src/scripts/libraries/*.js",
  js_compiled_path: "src/scripts/compiled/script.compiled.js",

  img_path: "src/img/**/*.{jpg,jpeg,png,gif,svg}",
  html_path: "src/**/*.html",
  scss_path: "src/scss/**/*.scss",
  css_compiled_path: "src/css/*.css",
  favicon_path: "src/img/favicons/*",

  compiled_ccs_out: "src/css/",
  css_out: "dist/css/",
  js_out: "dist/js/",
  compiled_js_out: "src/scripts/compiled",
  img_out: "dist/img/",
  html_out: "dist/",
  favicon_out: "dist/img/favicons",

  css_out_name: "style.css",
  css_out_min_name: "style.min.css",

  js_out_name: "script.js",
  js_out_compiled_name: "script.compiled.js",
  js_out_min_name: "script.min.js",

  css_replace_out: "css/style.min.css",
  js_replace_out: "js/script.min.js",
};

// Массив путей до других файлов
var filesToMove = [
  "src/fonts/**/*.*",
  "src/videos/**/*.*",
  "src/music/**/*.*",
  "src/files/**/*.*",
];

// Стандартная задача gulp, она же - задача для разработки
gulp.task("default", function () {
  gulp.watch(config.scss_path, gulp.series("sass"));
});

// Очистка папки с собранным проектом
gulp.task("clean", () => {
  return del([config.dist]);
});

// Минификация HTML с сортировкой и изменением путей до файлов стилей/скриптов для собранного проекта
gulp.task("html", function () {
  return gulp
    .src(config.html_path)
    .pipe(
      htmlReplace({
        css: config.css_replace_out,
        js: config.js_replace_out,
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

// Задача компиляции SCSS кода в CSS
gulp.task("scss", function () {
  return gulp
    .src(config.scss_path)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(rename(config.css_out_name))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.compiled_ccs_out));
});

// Задача для проставления вендорных префиксов в стилях
gulp.task("css-prefix", function () {
  return gulp
    .src(config.css_compiled_path)
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: false,
      })
    )
    .pipe(gulp.dest(config.compiled_ccs_out));
});

// Задача для минификации кода стилей для сокращения скорости загрузки веб-страницы
gulp.task("css-minify", function () {
  return gulp
    .src(config.css_compiled_path)
    .pipe(cleanCSS({ compatibility: "ie8", level: 2 }))
    .pipe(
      purgecss({
        content: ["src/**/*.html", "src/**/*.js"],
      })
    )
    .pipe(rename(config.css_out_min_name))
    .pipe(gulp.dest(config.css_out));
});

// Задача для конвертирования скриптов в код для старых браузеров
gulp.task("scripts-build", function () {
  return gulp
    .src(config.js_path)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest(config.compiled_js_out));
});

// Задача для соеденинения кода скриптов в один файл для уменьшения количества запросов к серверу
gulp.task("scripts-concat", function () {
  return gulp
    .src([config.js_libraries_path, config.js_path])
    .pipe(concat(config.js_out_compiled_name))
    .pipe(gulp.dest(config.compiled_js_out));
});

// Задача для минификации кода скриптов для сокращения скорости загрузки веб-страницы
gulp.task("scripts-minify", function () {
  return gulp
    .src(config.js_compiled_path)
    .pipe(rename(config.js_out_min_name))
    .pipe(uglify())
    .pipe(gulp.dest(config.js_out));
});

// Задача по сжатию изображений для сокращения скорости загрузки веб-страницы
gulp.task("image-min", function () {
  return gulp
    .src(config.img_path)
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(gulp.dest(config.img_out));
});

// Перемещаем другие файлы в директорию с собранным проектом
gulp.task("move", function () {
  return gulp.src(filesToMove, { base: "src/" }).pipe(gulp.dest("dist/"));
});

// Задача по созданию иконок вкладки браузера для сайта
gulp.task("favicons", () => {
  return gulp
    .src(config.favicon_path)
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

// Задача генерации карты сайта
gulp.task("sitemap", function () {
  return gulp
    .src(config.html_path, {
      read: true,
    })
    .pipe(
      sitemap({
        // Тут нужно указать домен вашего сайта, например https://www.amazon.com/
        siteUrl: "sample.ru",
      })
    )
    .pipe(gulp.dest(config.dist));
});

// Задача генерации файла robots.txt
gulp.task("robots", function () {
  return gulp
    .src("src/index.html")
    .pipe(
      robots({
        useragent: "*",
        allow: [""],
        disallow: [""],
      })
    )
    .pipe(gulp.dest(config.dist));
});

// Задача сборки готового для деплоя проекта в папку dist
gulp.task(
  "build",
  gulp.series(
    "clean",
    "html",
    "scripts-build",
    "scripts-concat",
    "scripts-minify",
    "scss",
    "css-prefix",
    "css-minify",
    "image-min",
    "move",
    "favicons",
    "robots",
    "sitemap"
  )
);
