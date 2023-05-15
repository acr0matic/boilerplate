const { task, src, dest } = require('gulp');
const postcss = require('gulp-postcss')

const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const sortMediaQueries = require('postcss-sort-media-queries');

const path = require('../gulpfile');

/*
- Удаление неиспользуемых стилей
- Минификация кода
- Переименовывание выходного файла
*/

task('minify_css', () => src(`${path.style.compiled}*.css`)
  .pipe(
    purgecss({
      fontFace: true,
      keyframes: true,
      variables: true,
      safelist: {
        deep: [/^swiper/],
        standard: [],
        greedy: []
      },
      content: [
        'src/layout/**/*.html',
        'src/assets/scripts/**/*.js',
      ],
    }),
  )
  .pipe(postcss(sortMediaQueries()))
  .pipe(cleanCSS({ level: 2 }))
  .pipe(dest(path.style.compiled)));
