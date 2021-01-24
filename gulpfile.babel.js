import gulp from 'gulp';

const requireDir = require('require-dir');

const paths = {
  src: './src/',
  dist: './dist/',

  html: {
    src: [
      './src/**/*.{html,php}',
      '!./src/php/**/*.php',
    ],
    dist: './dist/',
    watch: './src/**/*.{html,php}',
    css: 'css/style.min.css',
    js: 'js/script.min.js',
  },

  styles: {
    src: './src/scss/**/*.{scss,sass}',
    dist: './dist/css/',
    watch: './src/scss/**/*.{scss,sass}',
    temp: './src/css/',
    out: 'style.css',
    minify: 'style.min.css',
  },

  scripts: {
    src: './src/scripts/*.js',
    libraries: './src/scripts/libraries/*.js',
    polyfills: './src/scripts/polyfills/*.js',
    dist: './dist/js/',
    watch: './src/scripts/**/*.js',
    out: 'script.js',
    minify: 'script.min.js',
  },

  php: {
    src: './src/php/**/*.php',
    watch: './src/php/**/*.php',
  },

  favicons: {
    src: './src/img/favicons/favicon.{jpg,jpeg,png}',
    watch: './src/img/favicons/favicon.{jpg,jpeg,png}',
    dist: './dist/img/favicons',
  },

  images: {
    src: [
      './src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}',
      '!./src/img/favicons/*.{jpg,jpeg,png,gif,tiff}',
    ],
    dist: './dist/img',
    watch: './src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}',
  },

  files: {
    src: [
      './src/**/*.*',
      '!./src/css/**/*.*',
      '!./src/img/**/*.*',
      '!./src/scripts/**/*.*',
      '!./src/scss/**/*.*',
      '!./src/*.{html,php}',
    ],
    dist: './dist/',
    watch: [
      './src/**/*.*',
      '!./src/css/**/*.*',
      '!./src/img/**/*.*',
      '!./src/scripts/**/*.*',
      '!./src/scss/**/*.*',
      '!./src/*.{html,php}',
    ],
  },
};

module.exports = paths;

requireDir('./gulp_tasks/');

gulp.task('build',
  gulp.series('clean',
    gulp.series(['html', 'scss', 'autoprefix', 'minify_css', 'scripts', 'images', 'favicons', 'move'])));
