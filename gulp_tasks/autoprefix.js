const { task, src, dest } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

const paths = require('../gulpfile');

// Задача для проставления вендорных префиксов в стилях
task('autoprefix', () => src(paths.styles.temp + paths.styles.out)
  .pipe(
    autoprefixer({
      cascade: false,
      grid: 'autoplace'
    }),
  )
  .pipe(dest(paths.styles.temp)));
