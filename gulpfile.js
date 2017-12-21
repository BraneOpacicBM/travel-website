var gulp = require('gulp');
var watch = require('gulp-watch');
var postCSS = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var simpleVars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var postcssImport = require('postcss-import');
var browserSync = require('browser-sync').create();
var mixins = require('postcss-mixins');

gulp.task('default', function() {
	console.log("My first task!");
});

gulp.task('html', function() {
 browserSync.reload();
});

gulp.task('styles', function() {
 return gulp.src('app/assets/styles/style.css')
 .pipe(postCSS([postcssImport, mixins, simpleVars, nested, autoprefixer]))
 .pipe(gulp.dest('app/temp/styles/style.css'));
});

gulp.task('watch', function(){

	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});

	watch("app/index.html", function() {
		gulp.start('html');
	});

	watch("app/assets/styles/**/*.css", function(){
		gulp.start('cssInject');
	});


});

gulp.task("cssInject", ['styles'], function () {
	return gulp.src("app/temp/styles/style.css/style.css").pipe(browserSync.stream());
});