const { task, src, dest } = require('gulp');
const { stream } = require('browser-sync');

const fileinclude = require('gulp-file-include');
const path = require('../gulpfile');

/*
- Компиляция SCSS фрагментов в CSS код
- Генерация sourcemap
*/

task('include', () => src(path.html.include.src)
  .pipe(fileinclude({
    prefix: '@@',
    basepath: 'src/',
    indent: true,
  }))
  .pipe(dest(path.html.include.compiled)));
