const path = require('../gulpfile');

const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('webpack', () => {
  return gulp.src(path.script.src)
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(gulp.dest(path.script.compiled));
});