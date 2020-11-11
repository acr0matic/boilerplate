import gulp from 'gulp';
import paths from '../gulpfile.babel';

gulp.task('watch_scss', () => {
  gulp.watch((paths.styles.watch), gulp.parallel('scss'));
})
