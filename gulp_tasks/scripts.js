const { task, src, dest } = require('gulp');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const addsrc = require('gulp-add-src');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const paths = require('../gulpfile');

/*
- Задача конвертации синтаксиса ES2016+ в старый формат
- Объединение всех файлов скриптов в один
- Минификация кода
*/

task('scripts', () => src(paths.scripts.src)
  .pipe(babel())
  .pipe(addsrc.prepend(paths.scripts.polyfills))
  .pipe(addsrc.prepend(paths.scripts.libraries))
  .pipe(concat(paths.scripts.out))
  .pipe(uglify())
  .pipe(rename(paths.scripts.minify))
  .pipe(dest(paths.scripts.dist)));
