const { task, watch, series } = require('gulp');

const paths = require('../gulpfile');

// Задача для наблюдения изменений в  SCSS коде и компиляции его в CSS
task('default', () => watch(paths.styles.watch, series('scss')));
