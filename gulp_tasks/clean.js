const { task } = require('gulp');
const del = require('del');

const paths = require('../gulpfile');

/*
- Очистка каталога с билдом
*/

task('clean', () => del([paths.dist]));
