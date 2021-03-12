const { task, src, dest } = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const debug = require('gulp-debug');

const paths = require('../gulpfile');

// Задача для минификации кода стилей для сокращения скорости загрузки веб-страницы
task('minify_css', () => src(paths.styles.temp + paths.styles.out)
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
