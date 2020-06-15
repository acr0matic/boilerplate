import gulp from 'gulp';
import browserSync from 'browser-sync';

import paths from '../gulpfile.babel';

const { reload } = browserSync;

gulp.task('serve', () => {
  browserSync.init({
    server: './src/',
    port: 4000,
    notify: false,
  });

  gulp.watch(paths.html.watch).on('all', reload);
  gulp.watch((paths.styles.watch), gulp.parallel('scss'));
  gulp.watch(paths.scripts.watch).on('all', reload);
  gulp.watch(paths.images.watch).on('all', reload);
  gulp.watch(paths.files.watch).on('all', reload);
  gulp.watch(paths.favicons.watch).on('all', reload);
});
