const { task, src, dest } = require('gulp');
const { init, write } = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const { stream } = require('browser-sync');
const debug = require('gulp-debug');

const paths = require('../gulpfile');

// Задача компиляции SCSS кода в CSS
task('scss', () => src(paths.styles.src)
  .pipe(init())
  .pipe(sass())
  .pipe(debug({
    title: 'Compiled:',
    showCount: false,
  }))
  .pipe(rename(paths.styles.out))
  .pipe(debug({
    title: 'Renamed:',
    showCount: false,
  }))
  .pipe(write('.'))
  .pipe(debug({
    title: 'Sourcemaps:',
    showCount: true,
  }))
  .pipe(dest(paths.styles.temp))
  .pipe(debug({
    title: 'Moved to destination:',
    showCount: true,
  }))
  .pipe(stream({ match: '**/*.css' })));
