const { task, src, dest } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

const paths = require('../gulpfile');

/*
- Простановка вендорных префиксов в уже скомпилированном CSS
*/

task('autoprefix', () => src(paths.styles.temp + paths.styles.out)
  .pipe(
    autoprefixer({
      cascade: false,
      grid: 'autoplace'
    }),
  )
  .pipe(dest(paths.styles.temp)));
