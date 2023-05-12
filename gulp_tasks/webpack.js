const path = require('../gulpfile');

const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('webpack', () => {
  gulp.src(path.script.entry)
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(gulp.dest(path.script.compiled));
});