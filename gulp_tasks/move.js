const gulp = require('gulp');

const paths = require('../gulpfile');

gulp.task('move', () => gulp.src(paths.files.src).pipe(gulp.dest(paths.files.dist)));
