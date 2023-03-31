const { task } = require('gulp');
const del = require('del');

const path = require('../gulpfile');

/*
- Очистка каталога с билдом
*/

task('clean', () => del(path.main.dist));
