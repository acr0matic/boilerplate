const { task, watch, series, parallel } = require('gulp');

const path = require('../gulpfile');

/*
- Наблюдение за изменением SCSS
- Компиляция в CSS и перенос в временный каталог
*/

task('default', () => {
  watch(path.style.src, series('scss'))
  watch(path.script.src, series('webpack'))
  watch(path.html.layout.src, series('include'))
});


