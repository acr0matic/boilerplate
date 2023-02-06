process.env.NODE_ENV = 'default' // default или wordpress

const { task, series } = require('gulp');
const requireDir = require('require-dir');

const paths = {
  src: './src/',
  dist: './dist/',

  html: {
    src: './src/*.{html,php}',
    dist: './dist/',
    watch: './src/**/*.{html,php}',
  },

  layout: {
    src: './src/layout/*.html',
    temp: './src/',
    watch: ['./src/layout/**/*.html', './src/**/*.svg'],
  },

  styles: {
    src: ['./src/scss/**/*.{scss,sass}', '!./src/scss/core/**/*.{scss,sass}'],
    core: './src/scss/core',
    temp: './src/css/',
    dist: './dist/css/',
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
      '!./src/img/**/*.!(webp)',
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

task('build', series('clean', series(
  [
    'include',
    'bootstrap',
    'scss',
    'autoprefix',
    'minify_css',
    'replace',
    'scripts',
    'images',
    'favicons',
    'move',
    'layout',
  ],
)));