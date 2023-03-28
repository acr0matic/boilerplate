const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const paths = require('../gulpfile');

const useref = require('gulp-useref');
const htmlMin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const gulpIgnore = require('gulp-ignore');

const lazypipe = require('lazypipe');

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
  .pipe(dest, paths.html.dist);

const WPLayout = lazypipe()
  .pipe(htmlMin, {
    sortAttributes: true,
    sortClassName: true,
  })
  .pipe(rename, { extname: ".php" })
  .pipe(replace, 'src="img/', `src="<?php bloginfo('template_directory') ?>/assets/img/`)
  .pipe(replace, /@@(?!include)[^<]+/g, `<?php the_(); ?>`)



gulp.task('change_layout',
  () => src(paths.html.all)
    .pipe(useref({ noAssets: true }))
    .pipe(gulpif(process.env.NODE_ENV === 'default', PureLayout()))
    .pipe(gulpif(process.env.NODE_ENV === 'wordpress', WPLayout()))
    .pipe(dest(paths.html.dist))
);

gulp.task('move_layout',
  () => src(paths.html.dist + '/layout/*.php')
    .pipe(gulpif(process.env.NODE_ENV === 'wordpress', dest(paths.html.dist)))
);

gulp.task('clean_layout',
  async () => gulpif(process.env.NODE_ENV === 'wordpress', del(paths.html.dist + '/layout/*.php')));

gulp.task('layout',
  series('change_layout', 'move_layout', 'clean_layout'));
