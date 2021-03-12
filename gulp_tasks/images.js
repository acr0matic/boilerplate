const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const browsersync = require('browser-sync');
const debug = require('gulp-debug');

const paths = require('../gulpfile');

gulp.task('images', () => gulp.src(paths.images.src)
  .pipe(imagemin([
    imageminPngquant({
      speed: 5,
      quality: [0.6, 0.8],
    }),
    imageminZopfli({
      more: true,
    }),
    imageminMozjpeg({
      progressive: true,
      quality: 75,
    }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: false },
        { removeUnusedNS: false },
        { removeUselessStrokeAndFill: false },
        { cleanupIDs: false },
        { removeComments: true },
        { removeEmptyAttrs: true },
        { removeEmptyText: true },
        { collapseGroups: true },
      ],
    }),
  ]))
  .pipe(gulp.dest(paths.images.dist))
  .pipe(debug({
    title: 'Compressed',
  }))
  .on('end', browsersync.reload));
