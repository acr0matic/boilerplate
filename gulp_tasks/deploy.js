const gulp = require('gulp');
const ftp = require('vinyl-ftp');

/*
- Отправка файлов из папки dist на удаленный хостинг
*/

gulp.task('deploy', function () {
  const conn = ftp.create({
    host: '', // Имя хоста
    user: '', // Имя пользователя FTP
    password: '', // Пароль пользователя FTP
    parallel: 10,
  });

  return gulp.src('./dist/**/*', { base: './dist/', buffer: false })
    .pipe(conn.newer('/'))
    .pipe(conn.dest('/'));
});