const { src, dest, parallel, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-live-server');

// Task để biên dịch Pug thành HTML
function compilePug() {
  return src('pages/*.pug')
    .pipe(pug())
    .pipe(dest('dist'));
}

// Task để biên dịch Sass thành CSS
function compileSass() {
  return src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'));
}

// Task để chạy máy chủ web local
function startServer() {
  const liveServer = server.static('dist', 3000);
  liveServer.start();

  // Watch for changes in the dist folder and reload the server
  watch('dist/**/*').on('change', function () {
    liveServer.notify.apply(liveServer, arguments);
  });
}

// Task watch để tự động biên dịch khi có thay đổi
function watchFiles() {
  watch('pages/*.pug', compilePug);
  watch('sass/*.scss', compileSass);
}

// Task mặc định (chạy tất cả các task)
exports.default = parallel(compilePug, compileSass, watchFiles, startServer);
