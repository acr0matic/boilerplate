process.env.NODE_ENV = 'default' // default / wordpress / CMS

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
    src: [
      './src/assets/scss/**/*.{scss,sass}',
      '!./src/assets/scss/core/**/*.{scss,sass}'
    ],
    dest: './dist/css/',
    compiled: './src/temp/',

    core: {
      src: "./src/assets/scss/core/**/main.{scss,sass}",
      compiled: "./src/assets/scss/core/",
    },

    fileName: {
      default: 'style.css',
      minified: 'style.min.css',
    }
  },

  script: {
    src: './src/assets/scripts/**/*.js',
    entry: './src/assets/scripts/index.js',
    libraries: './src/assets/scripts/libraries/*',
    compiled: './src/temp/',
    dest: './dist/js/',
  },

  php: {
    src: './src/php/**/*.php',
    dest: './dist/php/',
  },

  image: {
    src: './src/assets/img/**/*.{jpg,jpeg,png,gif,tiff,svg,webp}',
    dest: './dist/assets/img',
  },

  favicon: {
    src: './src/assets/misc/favicons/favicon.png',
    dest: './dist/assets/misc/favicons',
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


/*
- Сборка, компиляция и наблюдение за имзенениями
*/

const { task, series, parallel, watch } = require('gulp');
const requireDir = require('require-dir');

module.exports = path;

requireDir('./gulp_tasks/');

task('build', series('clean', series(
  [
    'include',
    'styles',
    'scripts',
    'images',
    'favicons',
    'fonts',
    'files',
    'layout',
  ],
)));

task('watch', () => {
  watch(path.style.src, series('scss'))
  watch(path.html.layout.src, series('include'))
});

task('default', series([
  'include',
  'scss',
  parallel([
    'watch',
    'webpack',
  ])
]));
