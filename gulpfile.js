'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      clean = require('gulp-clean'),
      watch = require('gulp-watch'),
      babel = require('gulp-babel');

gulp.task('cssify', function(){
    return gulp.src('build/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets/'))
});

gulp.task('clean', function(){
  return gulp.src('public/stylesheets/*.css')
  .pipe(clean());
});

gulp.task('watch', function(){
  gulp.watch('build/sass/*.scss', ['clean', 'cssify']);
});
