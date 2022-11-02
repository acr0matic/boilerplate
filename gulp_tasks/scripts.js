const { task, src, dest } = require('gulp');

const lazypipe = require('lazypipe');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');

const paths = require('../gulpfile');

/*
- Объединение всех файлов скриптов в один
- Задача конвертации синтаксиса ES2016+ в старый формат
- Минификация кода
- Переименовывание выходного файла
*/

task('scripts', () =>
  src(paths.html.src)
    .pipe(useref({ searchPath: './src/' }))
    .pipe(gulpif(['**/*.js'], lazypipe().pipe(babel).pipe(uglify)()))
    .pipe(rename(paths.scripts.minify))
    .pipe(dest(paths.scripts.dist))
);
