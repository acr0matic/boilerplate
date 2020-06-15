import { task, src, dest } from 'gulp';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import purgecss from 'gulp-purgecss';
import shorthand from 'gulp-shorthand';
import debug from 'gulp-debug';

import paths from '../gulpfile.babel';

// Задача для минификации кода стилей для сокращения скорости загрузки веб-страницы
task('minify_css', () => src(paths.styles.temp + paths.styles.out)
  .pipe(shorthand())
  .pipe(debug({
    title: 'Compressed:',
    showCount: false,
  }))
  .pipe(
    purgecss({
      content: ['src/**/*.{html,php}', 'src/**/*.js'],
    }),
  )
  .pipe(debug({
    title: 'Cleaned:',
    showCount: false,
  }))
  .pipe(cleanCSS({ level: 2 }))
  .pipe(debug({
    title: 'Minified:',
    showCount: false,
  }))
  .pipe(rename(paths.styles.minify))
  .pipe(debug({
    title: 'Renamed:',
    showCount: false,
  }))
  .pipe(dest(paths.styles.dist)));
