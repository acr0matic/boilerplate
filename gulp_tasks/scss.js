const { task, src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const { stream } = require('browser-sync');

const paths = require('../gulpfile');

/*
- Компиляция SCSS фрагментов в CSS код
- Генерация sourcemap
*/

task('scss', () => src(paths.styles.src)
  .pipe(sourcemaps.init())
  .pipe(sass.sync())
  .pipe(rename(paths.styles.out))
  .pipe(sourcemaps.write('.'))
  .pipe(dest(paths.styles.temp))
  .pipe(stream({ match: '**/*.css' })));
