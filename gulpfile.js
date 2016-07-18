var gulp = require('gulp');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var pkg = require('./package.json');

function getToday() {
    var today = new Date();
    return [
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
    ].join('.');
}

gulp.task('build', function() {
    var banner = ["/**",
        " * <%= pkg.projectName %> - <%= pkg.description %>",
        " * @version: <%= pkg.version %> ",
        " * @author: <%= pkg.author %> ",
        " * @homepage: <%= pkg.homepage %> ",
        " * @date: " + getToday(),
        " * @license: under MIT license",
        " */",
    ""].join("\n");
    return gulp.src('source/*.js')
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('build'));
});

gulp.task('compress', function() {
    var banner = "/** <%= pkg.projectName %> v.<%= pkg.version %> | under MIT licence */\n";
    return gulp.src('source/*.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['build', 'compress']);
