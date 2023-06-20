const path = require('../gulpfile');

const { series, task, src, dest } = require('gulp');

const webpack = require('webpack-stream');
const webpackConfig = require("../webpack.config.js");

/*
- Объединение всех файлов скриптов в один
- Задача конвертации синтаксиса ES2016+ в старый формат
- Минификация кода
- Переименовывание выходного файла
*/

task('compile_js', () => {
  webpackConfig.mode = 'production';
  webpackConfig.devtool = 'source-map';
  webpackConfig.output.filename = "bundle.min.js";
  webpackConfig.watch = false;

  return src(path.script.entry)
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(dest(path.script.dest))
});

task('libraries_js', () => {
  return src(path.script.libraries)
    .pipe(dest(path.script.dest + 'libraries/'))
});

task('scripts',
  series('compile_js', 'libraries_js'));