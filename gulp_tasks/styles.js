const paths = require('../gulpfile');
const { task, series, src, dest } = require('gulp');

const rename = require('gulp-rename');
const replace = require('gulp-replace');
const gulpif = require('gulp-if');
const header = require('gulp-header');
const lazypipe = require('lazypipe');

/*
- Компиляция SCSS фрагментов в готовый билд CSS кода
*/

const WPCSS = lazypipe()
  .pipe(header,
    [
      '/*',
      'Theme Name: БАЗОВЫЙ ШАБЛОН',
      'Description: -',
      'Author: acr0matic',
      'Author URI: github.com / acr0matic',
      'Version: 1.0.0',
      '*/',
      '',
      ''
    ].join('\n'))
  .pipe(replace, '../', 'assets/')

task('css_replace', () => src(paths.styles.temp + paths.styles.out)
  .pipe(gulpif(process.env.NODE_ENV === 'wordpress', WPCSS()))
  .pipe(gulpif(process.env.NODE_ENV === 'default', rename(paths.styles.minify)))
  .pipe(dest(paths.styles.dist)));

task('styles',
  series(
    [
      'scss',
      'autoprefix',
      'minify_css',
      'css_replace'
    ]),
);