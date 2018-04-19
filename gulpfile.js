const gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    del = require('del'),
    browserSync = require('browser-sync'),
    uglifycss = require('gulp-uglifycss'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint');

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
  return gulp.src(['src/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('images', function () {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      une: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function() {
  return gulp.src([
    'src/fonts/**/*'])
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('clean', function () {
  return del.sync('dist/');
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  })
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});


gulp.task('build', ['clean', 'fonts', 'scripts', 'images', 'sass'], function () {

  gulp.src([
    'src/css/reset.css'
  ])
    .pipe(gulp.dest('dist/css'));

  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});
