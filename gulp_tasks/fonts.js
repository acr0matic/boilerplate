const gulp = require('gulp');

const path = require('../gulpfile');

gulp.task('fonts', () => gulp.src(path.font.src).pipe(gulp.dest(path.font.dest)));

