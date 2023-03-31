const { task, src, dest } = require('gulp');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss')

const path = require('../gulpfile');

/*
- Простановка вендорных префиксов в уже скомпилированном CSS
*/

task('autoprefix', () => src(`${path.style.compiled}*.css`)
  .pipe(postcss(autoprefixer()))
  .pipe(dest(path.style.compiled)));
