const { task, src, dest } = require('gulp');
const favicons = require('gulp-favicons');

const path = require('../gulpfile');

/*
- Генерация фавиконок для разных устройств
*/

task('favicons', () => src(path.favicon.src)
  .pipe(
    favicons({
      icons: {
        favicons: true,
        appleIcon: true,

        coast: false,
        yandex: false,
        android: false,
        windows: false,
        firefox: false,
        appleStartup: false,
      },
      background: 'transparent',
    }),
  )
  .pipe(dest(path.favicon.dest)));
