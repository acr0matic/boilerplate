process.env.NODE_ENV = 'wordpress' // default или wordpress

const path = {
  main: {
    src: './src/',
    dist: './dist/',
  },

  html: {
    src: './src/**/*.html',
    dest: './dist/',

    layout: {
      src: './src/layout/**/*.html',
      dest: './dist/',
    },

    include: {
      src: './src/layout/*.html',
      compiled: './src/',
    },
  },

  style: {
    src: ['./src/scss/**/*.{scss,sass}', '!./src/scss/core/'],
    dest: './dist/',
    compiled: './src/css/',

    core: {
      src: "./src/scss/core/**/main.{scss,sass}",
      compiled: "./src/scss/core/",
    },

    fileName: {
      default: 'style.css',
      minified: 'style.min.css',
    }
  },

  script: {
    src: '.src/scripts/**/*.js',
    dest: './dist/assets/js/',
    fileName: {
      default: 'script.js',
      minified: 'script.min.js',
    }
  },

  php: {
    src: './src/php/**/*.php',
    dest: './dist/php/',
  },

  image: {
    src: './src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}',
    dest: './dist/assets/img',
  },

  favicon: {
    src: './src/assets/misc/favicons/favicon.png',
    dest: './dist/assets/img/favicons',
  },

  font: {
    src: "./src/assets/fonts/**/*.*",
    dest: "./dist/assets/fonts/",
  },

  file: {
    src: "./src/assets/files/**/*.*",
    dest: "./dist/assets/files/",
  }
}

const { task, series } = require('gulp');
const requireDir = require('require-dir');

module.exports = path;

requireDir('./gulp_tasks/');

task('build', series('clean', series(
  [
    'include',
    'compile_core',
    'styles',
    'scripts',
    'images',
    'favicons',
    'fonts',
    'files',
    'layout',
  ],
)));