import { task, src, dest } from 'gulp';
import plumber, { stop } from 'gulp-plumber';
import debug from 'gulp-debug';
import favicons from 'gulp-favicons';

import paths from '../gulpfile.babel';

// Задача по созданию иконок вкладки браузера для сайта
task('favicons', () => src(paths.favicons.src)
  .pipe(plumber())
  .pipe(
    favicons({
      icons: {
        appleIcon: true,
        favicons: true,
        online: false,
        appleStartup: false,
        android: false,
        firefox: false,
        yandex: false,
        windows: false,
        coast: false,
      },
    }),
  )
  .pipe(debug({
    title: 'Favicon Created:',
  }))
  .pipe(stop())
  .pipe(dest(paths.favicons.dist)));
