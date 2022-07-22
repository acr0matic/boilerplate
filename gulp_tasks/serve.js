const gulp = require('gulp');
const browserSync = require('browser-sync');

const paths = require('../gulpfile');

const { reload } = browserSync;

gulp.task('serve', () => {
  // Убрать параметр server и в proxy указать адрес на котором
  // размещен сайт в локальном сервере
  browserSync.init({
    server: './src/',
    port: 4000,
    notify: false,
    // proxy: localhost
  });

  gulp.watch(paths.html.watch).on('all', reload);
  gulp.watch((paths.styles.watch), gulp.parallel('scss'));
  gulp.watch(paths.scripts.watch).on('all', reload);
  gulp.watch(paths.images.watch).on('all', reload);
  gulp.watch(paths.files.watch).on('all', reload);
  gulp.watch(paths.favicons.watch).on('all', reload);
});
