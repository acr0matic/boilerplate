import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminZopfli from 'imagemin-zopfli';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminGiflossy from 'imagemin-giflossy';
import browsersync from 'browser-sync';
import debug from 'gulp-debug';

import paths from '../gulpfile.babel';

gulp.task('images', () => gulp.src(paths.images.src)
  .pipe(imagemin([
    imageminGiflossy({
      optimizationLevel: 3,
      optimize: 3,
      lossy: 2,
    }),
    imageminPngquant({
      speed: 5,
      quality: [0.6, 0.8],
    }),
    imageminZopfli({
      more: true,
    }),
    imageminMozjpeg({
      progressive: true,
      quality: 90,
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
