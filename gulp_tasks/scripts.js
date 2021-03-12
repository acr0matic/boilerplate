const { task, src, dest } = require('gulp');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const addsrc = require('gulp-add-src');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const debug = require('gulp-debug');

const paths = require('../gulpfile');

/*
- Задача конвертации синтаксиса ES2016+ в старый формат
- Объединение всех файлов скриптов в один
- Минификация кода
*/

task('scripts', () => src(paths.scripts.src)
  .pipe(babel())
  .pipe(debug({
    title: 'Converted:',
    showCount: false,
  }))
  .pipe(addsrc.prepend(paths.scripts.polyfills))
  .pipe(addsrc.prepend(paths.scripts.libraries))
  .pipe(concat(paths.scripts.out))
  .pipe(debug({
    title: 'Concatenated:',
    showCount: false,
  }))
  .pipe(uglify())
  .pipe(debug({
    title: 'Minified:',
    showCount: false,
  }))
  .pipe(rename(paths.scripts.minify))
  .pipe(debug({
    title: 'Renamed:',
    showCount: false,
  }))
  .pipe(dest(paths.scripts.dist)));
