const { src, dest, parallel, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));

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

// Task để biên dịch JavaScript
// function compileJS() {
//   return src('js/*.js')
//     .pipe(dest('dist/js'));
// }


// Task watch để tự động biên dịch khi có thay đổi
function watchFiles() {
  watch('pages/**/*.pug', compilePug);
  watch('sass/*.scss', compileSass);
  // watch('js/*.js', compileJS);
}

// Task mặc định (chạy tất cả các task)
exports.default = parallel(compilePug, compileSass, watchFiles);
