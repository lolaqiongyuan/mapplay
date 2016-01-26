var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function(){
	return gulp.src('scss/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('assets'));
});

gulp.task('js', function(){
	return gulp.src('js/*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('assets'));
});

gulp.task('mixins', function(){
	return gulp.src('mixins/*.jade')
		.pipe(concat('mixins.jade'))
		.pipe(gulp.dest(''));
});

gulp.task('watch', function(){
	gulp.watch('mixins/*.jade', ['mixins']);
	gulp.watch('scss/*.scss', ['sass']);
	gulp.watch('js/*.js', ['js']);
});

gulp.task('default', ['mixins', 'sass', 'js', 'watch']);
