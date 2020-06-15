import { task, src, dest } from 'gulp';
import { init, write } from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import { stream } from 'browser-sync';
import debug from 'gulp-debug';

import paths from '../gulpfile.babel';

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
