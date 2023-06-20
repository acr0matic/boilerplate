const path = require('../gulpfile');
const del = require('del');
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
  .pipe(replace, '../assets/', 'assets/')
  .pipe(dest, path.html.dest)


task('css_replace', () => src(`${path.style.compiled}*.css`)
  .pipe(gulpif(process.env.NODE_ENV === 'wordpress', WPCSS()))
  .pipe(rename(path.style.fileName.minified))
  .pipe(gulpif(process.env.NODE_ENV === 'default', dest(path.style.dest))))

task('styles',
  series(
    'scss',
    'autoprefix',
    'minify_css',
    'css_replace',
  ),
);