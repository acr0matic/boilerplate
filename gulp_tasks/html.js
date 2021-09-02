const { task, src, dest } = require('gulp');

const gulpif = require('gulp-if');
const useref = require('gulp-useref');
const htmlMin = require('gulp-htmlmin');
const debug = require('gulp-debug');
const browsersync = require('browser-sync');

const paths = require('../gulpfile');

task('html', () => src(paths.html.src)
  .pipe(useref())
  .pipe(debug({
    title: 'Replaced:',
    showCount: false,
  }))
  .pipe(gulpif('*.{html,php}', htmlMin({
    sortAttributes: true,
    sortClassName: true,
    collapseWhitespace: false, // Отключить, если требуется посадка верстки на CMS
  }))
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
