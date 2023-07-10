const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');

const path = require('../gulpfile');

/*
- Оптимизация и сжатие изображений и SVG
*/

gulp.task('images', () => gulp.src(path.image.src)
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
      quality: 95,
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
  .pipe(gulp.dest(path.image.dest))
);
