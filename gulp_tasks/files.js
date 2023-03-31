const gulp = require('gulp');

const path = require('../gulpfile');

gulp.task('files', () => gulp.src(path.file.src).pipe(gulp.dest(path.file.dest)));

