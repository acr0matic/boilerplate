const { task, series } = require('gulp');

/*
- Компиляция SCSS фрагментов в готовый билд CSS кода
*/

task('styles', series(
  [
    'scss',
    'autoprefix',
    'minify_css',
    'replace',
  ],
));