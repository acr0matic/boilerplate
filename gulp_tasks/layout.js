const gulp = require('gulp');
const del = require('del');
const lazypipe = require('lazypipe');

const useref = require('gulp-useref');
const htmlMin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const gulpIgnore = require('gulp-ignore');

const path = require('../gulpfile');

const { src, dest, series } = require('gulp');

/*
- Изменение расширения под .php
- Изменение путей до ассетов
- Модификация кода под Wordpress
- Минификация и сортировка разметки
*/

const PureLayout = lazypipe()
  .pipe(gulpIgnore.exclude, 'layout/**/*.html')
  .pipe(htmlMin, {
    sortAttributes: true,
    sortClassName: true,
    removeComments: true,
    collapseWhitespace: true,
  })
  .pipe(dest, path.html.dest);

const WPLayout = lazypipe()
  .pipe(htmlMin, {
    sortAttributes: true,
    sortClassName: true,
  })
  .pipe(rename, { extname: ".php" })
  .pipe(replace, 'src="img/', `src="<?php bloginfo('template_directory') ?>/assets/img/`)
  .pipe(replace, /@@(?!include)[^<]+/g, `<?php the_(); ?>`)



gulp.task('change_layout',
  () => src(path.html.src)
    .pipe(useref({ noAssets: true }))
    .pipe(gulpif(process.env.NODE_ENV === 'default', PureLayout()))
    .pipe(gulpif(process.env.NODE_ENV === 'wordpress', WPLayout()))
    .pipe(dest(path.html.dest))
);

gulp.task('move_layout',
  () => src(path.html.dest + '/layout/*.php')
    .pipe(gulpif(process.env.NODE_ENV === 'wordpress', dest(path.html.dest)))
);

gulp.task('clean_layout',
  async () => gulpif(process.env.NODE_ENV === 'wordpress', del(path.html.dest + '/layout/*.php')));

gulp.task('layout',
  series('change_layout', 'move_layout', 'clean_layout'));