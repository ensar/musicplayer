const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');

gulp.task('css',() =>{
    return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/'))
});

gulp.task("js",()=>{
    return gulp.src('src/**/*.js')
    .pipe(babel({
        presets: [
          [
            "@babel/env",
            {
              modules: false
            }
          ]
        ]
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/'))
})

gulp.task('watch',()=>{
    gulp.watch('src/**/*.scss',gulp.series('css'))
    gulp.watch('src/**/*.js',gulp.series('js'))
});

gulp.task('default',gulp.parallel('css','js','watch'))