const { task, src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

const paths = require('../gulpfile');

/*
- Компиляция ядра в подключаемый файл
*/

task('bootstrap', () => src(`${paths.styles.core}/**/main.{scss,sass}`)
  .pipe(sass.sync())
  .pipe(rename('_main.scss'))
  .pipe(dest(paths.styles.core)));
