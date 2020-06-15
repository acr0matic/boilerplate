import { task, src, dest } from 'gulp';
import plumber, { stop } from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import debug from 'gulp-debug';

import paths from '../gulpfile.babel';

// Задача для проставления вендорных префиксов в стилях
task('autoprefix', () => src(paths.styles.temp + paths.styles.out)
  .pipe(plumber())
  .pipe(
    autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: false,
    }),
  )
  .pipe(debug({
    title: 'Prefixes set:',
    showCount: false,
  }))
  .pipe(stop())
  .pipe(dest(paths.styles.temp)));
