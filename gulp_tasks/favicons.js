const { task, src, dest } = require('gulp');
const debug = require('gulp-debug');
const favicons = require('gulp-favicons');

const paths = require('../gulpfile');

/*
- Генерация фавиконок для разных устройств
*/

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
    showCount: false,
  }))
  .pipe(dest(paths.favicons.dist)));
