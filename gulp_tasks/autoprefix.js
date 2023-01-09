const { task, src, dest } = require('gulp');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss')

const paths = require('../gulpfile');

/*
- Простановка вендорных префиксов в уже скомпилированном CSS
*/

task('autoprefix', () => src(paths.styles.temp + paths.styles.out)
  .pipe(
    postcss(autoprefixer()),
  )
  .pipe(dest(paths.styles.temp)));
