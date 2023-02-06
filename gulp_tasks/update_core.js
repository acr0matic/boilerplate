const { task, series } = require('gulp');

/*
- Компиляция CSS ядра и обновление текущих стилей
*/

task('update_core', series(
  [
    'bootstrap',
    'scss',
  ],
));