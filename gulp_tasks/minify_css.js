const { task, src, dest } = require('gulp');
const postcss = require('gulp-postcss')

const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const sortMediaQueries = require('postcss-sort-media-queries');

const paths = require('../gulpfile');

/*
- Удаление неиспользуемых стилей
- Минификация кода
- Переименовывание выходного файла
*/

task('minify_css', () => src(paths.styles.temp + paths.styles.out)
  .pipe(
    purgecss({
      content: ['src/**/*.{html,php}', 'src/**/*.js'],
    }),
  )
  .pipe(postcss(sortMediaQueries()))
  .pipe(cleanCSS({ level: 2 }))
  .pipe(rename(paths.styles.minify))
  .pipe(dest(paths.styles.dist)));
