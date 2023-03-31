const { task, src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

const path = require('../gulpfile');

/*
- Компиляция ядра в подключаемый файл
*/

task('compile_core', () => src(path.style.core.src)
  .pipe(sass.sync())
  .pipe(rename('_main.scss'))
  .pipe(dest(path.style.core.compiled)));
