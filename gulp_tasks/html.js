const { task, src, dest } = require('gulp');

const htmlReplace = require('gulp-html-replace');
const htmlMin = require('gulp-htmlmin');
const debug = require('gulp-debug');
const browsersync = require('browser-sync');

const paths = require('../gulpfile');

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
      collapseWhitespace: false,
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
