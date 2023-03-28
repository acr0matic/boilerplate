const { task, src, dest } = require('gulp');

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
  src(paths.layout.all)
    .pipe(useref({ searchPath: './src/' }))
    .pipe(gulpif(['**/*.js'], uglify()))
    .pipe(rename(paths.scripts.minify))
    .pipe(dest(paths.scripts.dist))
);
