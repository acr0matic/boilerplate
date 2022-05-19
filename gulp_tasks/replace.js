const gulp = require('gulp');
const paths = require('../gulpfile');

const replace = require('gulp-replace');
const { src, dest } = require('gulp');
const gulpif = require('gulp-if');

gulp.task('replace', () => src(paths.styles.dist + paths.styles.minify)
  .pipe(gulpif(process.env.NODE_ENV === 'wordpress', replace('../', 'assets/')))
  .pipe(gulpif(process.env.NODE_ENV === 'default', replace('assets/', '../')))
  .pipe(dest(paths.styles.dist)));
