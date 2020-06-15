import { task, src, dest } from 'gulp';

import htmlReplace from 'gulp-html-replace';
import htmlMin from 'gulp-htmlmin';
import debug from 'gulp-debug';
import browsersync from 'browser-sync';

import paths from '../gulpfile.babel';

task('html', () => src(paths.html.src)
  .pipe(
    htmlReplace({
      css: paths.html.css,
      js: paths.html.js,
    }),
  )
  .pipe(debug({
    title: 'Replaced:',
    showCount: false,
  }))
  .pipe(
    htmlMin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true,
    }),
  )
  .pipe(debug({
    title: 'Minified:',
    showCount: false,
  }))
  .pipe(dest(paths.html.dist))
  .pipe(debug({
    title: 'Moved:',
    showCount: false,
  }))
  .pipe(browsersync.stream()));
