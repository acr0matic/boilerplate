const { task, src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const { stream } = require('browser-sync');
const debug = require('gulp-debug');

const paths = require('../gulpfile');

// Задача компиляции SCSS кода в CSS
task('scss', () => src(paths.styles.src)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(rename(paths.styles.out))
  .pipe(sourcemaps.write('.'))
  .pipe(dest(paths.styles.temp))
  .pipe(stream({ match: '**/*.css' })));
