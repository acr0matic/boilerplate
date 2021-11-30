const { task, src, dest } = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');

const paths = require('../gulpfile');

// Задача для минификации кода стилей для сокращения скорости загрузки веб-страницы
task('minify_css', () => src(paths.styles.temp + paths.styles.out)
  .pipe(
    purgecss({
      content: ['src/**/*.{html,php}', 'src/**/*.js'],
    }),
  )
  .pipe(cleanCSS({ level: 2 }))
  .pipe(rename(paths.styles.minify))
  .pipe(dest(paths.styles.dist)));
