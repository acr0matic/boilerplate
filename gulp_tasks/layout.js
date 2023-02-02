const { task, src, dest } = require('gulp');

const useref = require('gulp-useref');
const htmlMin = require('gulp-htmlmin');
const gulpif = require('gulp-if');

const paths = require('../gulpfile');

/*
- Переименовывание ассетов
- Минификация и сортировка разметки
*/

task('layout', () => src(paths.html.src)
  .pipe(useref({ noAssets: true }))
  .pipe(gulpif(process.env.NODE_ENV === 'wordpress', htmlMin()))
  .pipe(gulpif(process.env.NODE_ENV === 'default', htmlMin({
    sortAttributes: true,
    sortClassName: true,
    removeComments: true,
    collapseWhitespace: true,
  })))
  .pipe(dest(paths.html.dist)));
