const { task, series } = require('gulp');

task('styles', series(
  [
    'scss',
    'autoprefix',
    'minify_css',
    'replace',
  ],
));