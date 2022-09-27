const { task, src, dest } = require('gulp');

const useref = require('gulp-useref');
const htmlMin = require('gulp-htmlmin');
const browsersync = require('browser-sync');

const paths = require('../gulpfile');

/*
- Переименовывание ассетов
- Минификация и сортировка разметки
*/

task('layout', () => src(paths.html.src)
  .pipe(useref({ searchPath: [paths.styles.src, paths.scripts.src] }))
  .pipe(htmlMin({
    sortAttributes: true,
    sortClassName: true,
    removeComments: true, // Отключить, если требуется посадка верстки на CMS
    collapseWhitespace: true, // Отключить, если требуется посадка верстки на CMS
  }))
  .pipe(dest(paths.html.dist)));
