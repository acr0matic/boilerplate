import gulp from 'gulp';

import paths from '../gulpfile.babel';

gulp.task('move', () => gulp.src(paths.files.src).pipe(gulp.dest(paths.files.dist)));
