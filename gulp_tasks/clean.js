const { task } = require('gulp');
const del = require('del');

const paths = require('../gulpfile');

task('clean', () => del([paths.dist]));
