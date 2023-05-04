const { task, src, dest } = require('gulp');
const lazypipe = require('lazypipe');

const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');

const path = require('../gulpfile');

/*
- Объединение всех файлов скриптов в один
- Задача конвертации синтаксиса ES2016+ в старый формат
- Минификация кода
- Переименовывание выходного файла
*/

const Compile = lazypipe()
  .pipe(babel, {
    presets: [
      "@babel/preset-env"
    ],
    exclude: [
      "./src/scripts/polyfills/*.js",
      "./src/scripts/libraries/*.js",
    ]
  })
  .pipe(uglify)
  .pipe(dest, path.script.dest);

task('scripts', () =>
  src(path.html.layout.src)
    .pipe(useref({ searchPath: './src/' }))
    .pipe(gulpif(['**/*.js'], Compile())));
