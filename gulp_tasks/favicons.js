const { task, src, dest } = require('gulp');
const debug = require('gulp-debug');
const favicons = require('gulp-favicons');

const paths = require('../gulpfile');

// Задача по созданию иконок вкладки браузера для сайта
task('favicons', () => src(paths.favicons.src)
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
      background: 'transparent',
    }),
  )
  .pipe(debug({
    title: 'Favicon Created:',
  }))
  .pipe(dest(paths.favicons.dist)));
