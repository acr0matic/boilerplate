import { task, src, dest } from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import addsrc from 'gulp-add-src';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify-es';
import debug from 'gulp-debug';

import paths from '../gulpfile.babel';

/*
- Задача конвертации синтаксиса ES2016+ в старый формат
- Объединение всех файлов скриптов в один
- Минификация кода
*/

task('scripts', () => src(paths.scripts.src)
  .pipe(plumber())
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
